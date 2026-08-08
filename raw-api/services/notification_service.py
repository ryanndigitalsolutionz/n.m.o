from extensions import db
from models.notification import Notification


def create_notification(
    title,
    message,
    notification_type="general",
    user_id=None
):
    notification = Notification(
        title=title,
        message=message,
        notification_type=notification_type,
        user_id=user_id,
        is_read=False
    )

    db.session.add(notification)
    db.session.commit()

    return notification
