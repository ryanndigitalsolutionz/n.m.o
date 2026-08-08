from flask_mail import Message
from extensions import mail


def send_email(
    recipient,
    subject,
    html,
):
    message = Message(
        subject=subject,
        recipients=[recipient],
        html=html,
    )

    mail.send(message)


def send_invitation_email(
    email,
    first_name,
    role,
    temporary_password,
):

    subject = "Welcome to Nairobi Mining Operations"

    html = f"""
    <h2>Welcome to Nairobi Mining Operations</h2>

    <p>Hello <strong>{first_name}</strong>,</p>

    <p>Congratulations! Your access request has been approved.</p>

    <p><strong>Assigned Role:</strong> {role.title()}</p>

    <p><strong>Temporary Password:</strong> {temporary_password}</p>

    <p>Please log in and change your password immediately.</p>

    <br>

    <p>Regards,<br><strong>Nairobi Mining Operations</strong></p>
    """

    send_email(
        recipient=email,
        subject=subject,
        html=html,
    )


def send_rejection_email(
    email,
    first_name,
):

    subject = "Access Request Update"

    html = f"""
    <h2>Nairobi Mining Operations</h2>

    <p>Hello <strong>{first_name}</strong>,</p>

    <p>Thank you for your interest in Nairobi Mining Operations.</p>

    <p>Unfortunately, your access request was not approved this time.</p>

    <p>
        This does <strong>not</strong> prevent you from applying again in the
        future.
    </p>

    <p>We appreciate your interest and wish you all the best.</p>

    <br>

    <p>Regards,<br><strong>Nairobi Mining Operations</strong></p>
    """

    send_email(
        recipient=email,
        subject=subject,
        html=html,
    )