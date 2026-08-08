from flask import request
from flask_restful import Resource

from extensions import db
from models.user import User


class ManagementAuthResource(Resource):
    def post(self):
        data = request.get_json()

        username = data.get("username", "").strip()
        password = data.get("password", "")

        if not username or not password:
            return {
                "success": False,
                "message": "Username and password are required."
            }, 400

        user = User.query.filter_by(username=username).first()

        if not user:
            return {
                "success": False,
                "message": "Invalid username or password."
            }, 401

        if user.password != password:
            return {
                "success": False,
                "message": "Invalid username or password."
            }, 401

        return {
            "success": True,
            "user": {
                "id": user.user_id,
                "username": user.username,
                "role": user.role,
            }
        }, 200
