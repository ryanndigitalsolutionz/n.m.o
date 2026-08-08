from datetime import datetime
from extensions import db


class Notification(db.Model):
    __tablename__ = "notifications"

    notification_id = db.Column(
        db.Integer,
        primary_key=True
    )

    title = db.Column(
        db.String(150),
        nullable=False
    )

    message = db.Column(
        db.Text,
        nullable=False
    )

    notification_type = db.Column(
        db.String(50),
        nullable=False
    )

    is_read = db.Column(
        db.Boolean,
        default=False
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.user_id"),
        nullable=False
    )

    user = db.relationship(
        "User",
        back_populates="notifications"
    )

    def to_dict(self):
        return {
            "notification_id": self.notification_id,
            "title": self.title,
            "message": self.message,
            "type": self.notification_type,
            "is_read": self.is_read,
            "created_at": self.created_at.isoformat(),
            "user_id": self.user_id,
        }
