from flask_restful import Resource

from auth import current_user
from services.permissions import require_management_role

from models.user import User
from flask_jwt_extended import (
    jwt_required,
    get_jwt,
    get_jwt_identity,
)
from app import app
from extensions import db

with app.app_context():
    print(db.engine.url)

class StaffListResource(Resource):

    @jwt_required()
    def get(self):

        print("JWT identity:", get_jwt_identity())
        print("JWT claims:", get_jwt())

        denied = require_management_role(
            "admin",
            "manager",
            "inspector",
        )

        if denied:
            print("Permission denied:", denied)
            return denied

        users = User.query.order_by(
            User.role,
            User.username
        ).all()

        return {
            "success": True,
            "staff": [
            {
                "user_id": u.user_id,
                "username": u.username,
                "email": u.email,
                "role": u.role,
                "online": u.online,
                "last_active": (
                    u.last_active.isoformat()
                    if u.last_active
                    else None
                ),
            }
                for u in users
            ],
        }, 200
