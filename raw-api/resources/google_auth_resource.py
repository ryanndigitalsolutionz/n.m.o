import secrets

from flask import url_for, redirect
from flask_restful import Resource
from flask_jwt_extended import create_access_token

from extensions import oauth
from models.user import User


class GoogleLoginResource(Resource):

    def get(self):

        google = oauth.create_client("google")

        redirect_uri = url_for(
            "googlecallbackresource",
            _external=True,
        )

        return google.authorize_redirect(
            redirect_uri
        )


class GoogleCallbackResource(Resource):

    def get(self):

        google = oauth.create_client("google")

        token = google.authorize_access_token()

        user_info = token["userinfo"]

        email = user_info["email"]

        user = User.query.filter_by(
            email=email
        ).first()

        # --------------------------------------------------
        # SECURITY CHECK
        # --------------------------------------------------
        # Only users already approved by management
        # are allowed to sign in with Google.
        # --------------------------------------------------

        if not user:

            return redirect(
                "https://n-m-o.vercel.app/login"
                "?error=access_denied"
            )

        access_token = create_access_token(
            identity=str(user.user_id),
            additional_claims={
                "username": user.username,
                "role": user.role,
            },
        )

        frontend_url = (
            "https://n-m-o.vercel.app/dashboard"
            f"?google_login=1"
            f"&token={access_token}"
            f"&username={user.username}"
            f"&role={user.role}"
        )

        return redirect(frontend_url)
