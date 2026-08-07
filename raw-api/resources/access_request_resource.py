from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required

from extensions import db
from models.access_request import AccessRequest
from models.user import User
from auth import current_user, require_role


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
            reason=data["reason"]
        )

        db.session.add(access_request)
        db.session.commit()

        return {
            "success": True,
            "message": "Access request submitted successfully."
        }, 201

    @jwt_required()
    def get(self):

        user = current_user()

        require_role(user, "admin")

        requests = AccessRequest.query.order_by(
            AccessRequest.created_at.desc()
        ).all()

        return [
            request.to_dict()
            for request in requests
        ], 200
