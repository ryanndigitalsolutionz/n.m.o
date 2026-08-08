from datetime import datetime
import requests
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
            "success": True,
            "requests": [
                {
                    "id": r.request_id,
                    "name": f"{r.first_name} {r.last_name}",
                    "email": r.email,
                    "requested_role": "Employee",
                    "status": r.status,
                    "created_at": r.created_at.isoformat(),
                }
        for r in requests
    ]
}, 200