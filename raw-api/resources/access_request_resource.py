from flask_restful import Resource
from flask import request
from extensions import bcrypt
import secrets
import string
from flask_jwt_extended import jwt_required, get_jwt, get_jwt_identity
from extensions import db
from models.access_request import AccessRequest
from models.user import User
from services.email_service import send_rejection_email, send_invitation_email
from services.notification_service import create_notification
from services.permissions import require_management_role


class AccessRequestListResource(Resource):

    def post(self):

        data = request.get_json()

        email = data.get("email")

        if not email:
            return {
                "success": False,
                "message": "Email is required."
            }, 400

        if User.query.filter_by(email=email).first():
            return {
                "success": False,
                "message": "An account already exists with this email."
            }, 409

        if AccessRequest.query.filter_by(
            email=email,
            status="Pending"
        ).first():
            return {
                "success": False,
                "message": "You already have a pending request."
            }, 409

        access_request = AccessRequest(
            first_name=data["first_name"],
            last_name=data["last_name"],
            email=email,
            residence=data["residence"],
            reason=data["reason"],
        )

        db.session.add(access_request)
        db.session.commit()

        admins = User.query.filter_by(role="admin").all()

        for admin in admins:
            create_notification(
                title="New Access Request",
                message=f"{email} requested access.",
                notification_type="access_request",
                user_id=admin.user_id,
            )

        return {
            "success": True,
            "message": "Access request submitted successfully.",
        }, 201

    @jwt_required()
    def get(self):

        print("=" * 60)
        print("JWT identity:", get_jwt_identity())
        print("JWT claims:", get_jwt())
        print("=" * 60)

        denied = require_management_role(
            "admin",
            "manager",
        )

        if denied:
            print("Permission denied:", denied)
            return denied

        requests = AccessRequest.query.order_by(
            AccessRequest.created_at.desc()
        ).all()

        return {
            "success": True,
            "requests": [
                {
                    "id": r.request_id,
                    "name": f"{r.first_name} {r.last_name}",
                    "email": r.email,
                    "requested_role": "Employee",
                    "status": r.status,
                    "created_at": r.created_at.isoformat()
                    if r.created_at
                    else None,
                    "residence": r.residence,
                    "reason": r.reason,
                }
                for r in requests
            ],
        }, 200

class ApproveAccessRequestResource(Resource):

    @jwt_required()
    def patch(self, request_id):

        denied = require_management_role(
            "admin",
            "manager",
        )

        if denied:
            return denied

        access_request = AccessRequest.query.get(request_id)

        if not access_request:
            return {
                "success": False,
                "message": "Access request not found.",
            }, 404

        data = request.get_json()

        role = data.get("role")

        allowed_roles = [
            "worker",
            "inspector",
            "manager",
            "admin",
        ]

        if role not in allowed_roles:
            return {
                "success": False,
                "message": "Invalid role.",
            }, 400

        alphabet = string.ascii_letters + string.digits

        temporary_password = "".join(
            secrets.choice(alphabet)
            for _ in range(10)
        )

        user = User(
            username=f"{access_request.first_name} {access_request.last_name}",
            email=access_request.email,
            role=role,
        )

        user.password = temporary_password

        db.session.add(user)

        db.session.delete(access_request)

        db.session.commit()

        send_invitation_email(
            email=access_request.email,
            first_name=access_request.first_name,
            role=role,
            temporary_password=temporary_password,
        )

        return {

            "success": True,

            "message": "Employee approved.",

        }, 200

class RejectAccessRequestResource(Resource):

    @jwt_required()
    def delete(self, request_id):

        denied = require_management_role(
            "admin",
            "manager",
        )

        if denied:
            return denied

        access_request = AccessRequest.query.get(
            request_id
        )

        if not access_request:
            return {
                "success": False,
                "message": "Access request not found.",
            }, 404

        send_rejection_email(
            email=access_request.email,
            first_name=access_request.first_name,
        ) 

        db.session.delete(access_request)

        db.session.commit()

        return {

            "success": True,

            "message": "Request rejected.",

        }, 200