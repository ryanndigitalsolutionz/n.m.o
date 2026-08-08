from flask import request
from flask_restful import Resource
from models.user import User
from datetime import datetime
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from extensions import db, bcrypt
from services.permissions import require_management_role
from services.notification_service import create_notification



class ManagementLoginResource(Resource):

    def post(self):

        data = request.get_json()

        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            return {
                "success": False,
                "message": "Username and password are required."
            }, 400

        user = User.query.filter_by(
            username=username
        ).first()

        if (
            not user or
            not bcrypt.check_password_hash(
                user.password_hash,
                password
            )
        ):
            return {
                "success": False,
                "message": "Invalid username or password."
            }, 401

        user.online = True
        user.last_active = datetime.utcnow()
        admins = User.query.filter_by(role="admin").all()

        for admin in admins:
            create_notification(
            title="Staff Login",
            message=f"{user.username} signed in as {user.role}.",
            notification_type="login",
            user_id=admin.user_id,
        )

        token = create_access_token(
            identity=str(user.user_id),
            additional_claims={
                "role": user.role,
                "username": user.username
            }
        )

        print("=" * 50)
        print("TOKEN CREATED")
        print(token)
        print("=" * 50)
        
        return {
            "success": True,
            "token": token,
            "username": user.username,
            "role": user.role
        }, 200

class AdminDashboardResource(Resource):

    @jwt_required()
    def get(self):

        denied = require_management_role("admin")

        if denied:
            return denied

        return {
            "success": True,
            "statistics": {
                "workers": 0,
                "managers": 0,
                "inspectors": 0,
                "pending_access_requests": 0,
                "pending_certificates": 0,
                "active_sites": 0,
                "shipments_today": 0,
                "online_users": 0,
            },
        }, 200


class ManagerDashboardResource(Resource):

    @jwt_required()
    def get(self):

        denied = require_management_role(
            "admin",
            "manager",
        )

        if denied:
            return denied

        return {
            "success": True,
            "statistics": {
                "workers": 0,
                "assigned_tasks": 0,
                "completed_tasks": 0,
                "active_sites": 0,
                "shipments_today": 0,
            },
        }, 200


class InspectorDashboardResource(Resource):

    @jwt_required()
    def get(self):

        denied = require_management_role(
            "admin",
            "manager",
            "inspector",
        )

        if denied:
            return denied

        return {
            "success": True,
            "statistics": {
                "pending_verifications": 0,
                "completed_verifications": 0,
                "certificates_waiting": 0,
            },
        }, 200


class WorkerDashboardResource(Resource):

    @jwt_required()
    def get(self):

        denied = require_management_role(
            "admin",
            "manager",
            "inspector",
            "worker",
        )

        if denied:
            return denied

        return {
            "success": True,
            "statistics": {
                "assigned_tasks": 0,
                "completed_tasks": 0,
            },
        }, 200

class ManagementLogoutResource(Resource):

    @jwt_required()
    def post(self):

        user = User.query.get(int(get_jwt_identity()))

        if user:
            user.online = False
            user.last_active = datetime.utcnow()
            db.session.commit()

        return {
            "success": True,
            "message": "Logged out successfully."
        }, 200