from flask_restful import Resource
from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity

from extensions import db
from models.notification import Notification


class NotificationListResource(Resource):

    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()

        notifications = (
            Notification.query
            .filter_by(user_id=user_id)
            .order_by(Notification.created_at.desc())
            .all()
        )

        return [
            notification.to_dict()
            for notification in notifications
        ], 200

    @jwt_required()
    def post(self):
        data = request.get_json()

        notification = Notification(
            title=data["title"],
            message=data["message"],
            notification_type=data["notification_type"],
            user_id=data["user_id"],
        )

        db.session.add(notification)
        db.session.commit()

        return notification.to_dict(), 201


class NotificationReadResource(Resource):

    @jwt_required()
    def patch(self, notification_id):

        notification = Notification.query.get_or_404(
            notification_id
        )

        notification.is_read = True

        db.session.commit()

        return {
            "message": "Notification marked as read."
        }, 200

    @jwt_required()
    def delete(self, notification_id):

        notification = Notification.query.get_or_404(
            notification_id
        )

        db.session.delete(notification)

        db.session.commit()

        return {
            "message": "Notification deleted."
        }, 200