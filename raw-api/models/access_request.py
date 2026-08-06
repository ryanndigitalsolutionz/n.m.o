from datetime import datetime

from extensions import db


class AccessRequest(db.Model):
    __tablename__ = "access_requests"

    request_id = db.Column(
        db.Integer,
        primary_key=True
    )

    first_name = db.Column(
        db.String(80),
        nullable=False
    )

    last_name = db.Column(
        db.String(80),
        nullable=False
    )

    email = db.Column(
        db.String(120),
        nullable=False,
        unique=True
    )

    residence = db.Column(
        db.String(120),
        nullable=False
    )

    reason = db.Column(
        db.Text,
        nullable=False
    )

    status = db.Column(
        db.String(20),
        default="Pending"
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

def to_dict(self):
    return {
        "request_id": self.request_id,
        "first_name": self.first_name,
        "last_name": self.last_name,
        "email": self.email,
        "residence": self.residence,
        "reason": self.reason,
        "status": self.status,
        "created_at": self.created_at.isoformat()
    }