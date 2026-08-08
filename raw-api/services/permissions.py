from flask_jwt_extended import get_jwt


def require_management_role(*roles):
    """
    Protects management endpoints by checking the
    authenticated user's role stored in the JWT.
    """

    claims = get_jwt()

    role = claims.get("role", "").lower()

    allowed = [
        r.lower()
        for r in roles
    ]

    if role not in allowed:
        return {
            "success": False,
            "message": (
                f"Unauthorized. "
                f"{role.title()} cannot access this resource."
            ),
        }, 403

    return None
