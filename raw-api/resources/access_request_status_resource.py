from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required

from auth import current_user, require_role
from extensions import db
from models.access_request import AccessRequest


class AccessRequestStatusResource(Resource):

    @jwt_required()
    def patch(self, request_id):

        admin = current_user()

        require_role(admin, "admin")

        access_request = AccessRequest.query.get(request_id)

        if not access_request:
            return {
                "success": False,
                "message": "Access request not found."
            }, 404

        data = request.get_json()

        status = data.get("status")

        if status not in [
            "Pending",
            "Approved",
            "Rejected"
        ]:
            return {
                "success": False,
                "message": "Invalid status."
            }, 400

        access_request.status = status

        db.session.commit()

        return {
            "success": True,
            "message": f"Request {status.lower()}."
        }, 200
