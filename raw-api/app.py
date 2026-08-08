from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from werkzeug.middleware.proxy_fix import ProxyFix

from config import Config
from extensions import db, ma, bcrypt, jwt, migrate, oauth, mail

from resources.auth_resource import (
    RegisterResource,
    LoginResource,
    CurrentUserResource,
    LogoutResource
)

from resources.user_resource import UserListResource, UserResource
from resources.mining_site_resource import MiningSiteListResource, MiningSiteResource
from resources.mineral_resource import MineralListResource, MineralResource
from resources.harvest_record_resource import HarvestRecordListResource, HarvestRecordResource
from resources.certificate_resource import CertificateListResource, CertificateResource
from resources.vehicle_resource import VehicleListResource, VehicleResource
from resources.shipment_resource import ShipmentListResource, ShipmentResource
from resources.site_record_resource import SiteRecordListResource, SiteRecordResource
from resources.google_auth_resource import GoogleLoginResource, GoogleCallbackResource
from resources.forgot_password_resource import ForgotPasswordResource
from resources.reset_password_resource import ResetPasswordResource
from resources.settings_resource import SettingsResource
from resources.access_request_resource import AccessRequestListResource, ApproveAccessRequestResource, RejectAccessRequestResource
from resources.access_request_status_resource import AccessRequestStatusResource
from resources.notification_resource import NotificationListResource, NotificationReadResource
from resources.management_resource import ManagementLoginResource, AdminDashboardResource, ManagerDashboardResource, InspectorDashboardResource, WorkerDashboardResource, ManagementLogoutResource
from resources.management_auth_resource import ManagementAuthResource
from resources.staff_resource import StaffListResource

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    app.wsgi_app = ProxyFix(
        app.wsgi_app,
        x_for=1,
        x_proto=1,
        x_host=1,
        x_port=1,
    )

    CORS(
        app,
        resources={
            r"/api/*": {
                "origins": [
                    "https://n-m-o.vercel.app"
                ]
            }
        },
        supports_credentials=True,
    )

    db.init_app(app)
    migrate.init_app(app, db)
    ma.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    oauth.init_app(app)
    mail.init_app(app)

    oauth.register(
        name="google",
        client_id=app.config["GOOGLE_CLIENT_ID"],
        client_secret=app.config["GOOGLE_CLIENT_SECRET"],
        server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
        client_kwargs={
            "scope": "openid email profile"
        }
    )

    api = Api(app)

    @app.get("/")
    def home():
        return {
            "status": "Healthy",
            "message": "Mining Management API is running!"
        }, 200

    # ---------- Authentication ----------

    api.add_resource(RegisterResource, "/api/register")
    api.add_resource(LoginResource, "/api/login")
    api.add_resource(CurrentUserResource, "/api/me")
    api.add_resource(LogoutResource, "/api/logout")

    # ---------- Users ----------

    api.add_resource(UserListResource, "/api/users")
    api.add_resource(UserResource, "/api/users/<int:user_id>")

    # ---------- Mining Sites ----------

    api.add_resource(MiningSiteListResource, "/api/mining-sites")
    api.add_resource(MiningSiteResource, "/api/mining-sites/<int:site_id>")

    # ---------- Minerals ----------

    api.add_resource(MineralListResource, "/api/minerals")
    api.add_resource(MineralResource, "/api/minerals/<int:mineral_id>")

    # ---------- Harvest Records ----------

    api.add_resource(HarvestRecordListResource, "/api/harvest-records")
    api.add_resource(HarvestRecordResource, "/api/harvest-records/<int:harvest_id>")

    # ---------- Certificates ----------

    api.add_resource(CertificateListResource, "/api/certificates")
    api.add_resource(CertificateResource, "/api/certificates/<int:certificate_id>")

    # ---------- Vehicles ----------

    api.add_resource(VehicleListResource, "/api/vehicles")
    api.add_resource(VehicleResource, "/api/vehicles/<int:vehicle_id>")

    # ---------- Shipments ----------

    api.add_resource(ShipmentListResource, "/api/shipments")
    api.add_resource(ShipmentResource, "/api/shipments/<int:shipment_id>")

    # ---------- Site Records ----------

    api.add_resource(SiteRecordListResource, "/api/site-records")
    api.add_resource(SiteRecordResource, "/api/site-records/<int:record_id>")

    # ---------- Google Callbacks ----------

    api.add_resource(GoogleLoginResource, "/api/auth/google")
    api.add_resource(GoogleCallbackResource, "/api/auth/google/callback")

    # ---------- Invitations ----------

    api.add_resource(ApproveAccessRequestResource, "/api/access-requests/<int:request_id>/approve",)
    api.add_resource(RejectAccessRequestResource, "/api/access-requests/<int:request_id>/reject",)

    # ---------- Password Resets ----------

    api.add_resource(ForgotPasswordResource, "/api/forgot-password")
    api.add_resource(ResetPasswordResource, "/api/reset-password")

    # ---------- Settings ----------

    api.add_resource(SettingsResource, "/api/settings")

    # ---------- Visitor Access ----------

    api.add_resource(AccessRequestListResource, "/api/access-requests")
    api.add_resource(AccessRequestStatusResource, "/api/access-requests/<int:request_id>")

    # ---------- Notifications ----------

    api.add_resource(NotificationListResource, "/api/notifications")
    api.add_resource(NotificationReadResource, "/api/notifications/<int:notification_id>")

    # ---------- Management Console ----------

    api.add_resource(ManagementAuthResource, "/api/management/auth")
    api.add_resource(ManagementLoginResource, "/api/management/login")
    api.add_resource(AdminDashboardResource, "/api/management/admin/dashboard")
    api.add_resource(ManagerDashboardResource, "/api/management/manager/dashboard")
    api.add_resource(InspectorDashboardResource, "/api/management/inspector/dashboard")
    api.add_resource(WorkerDashboardResource, "/api/management/worker/dashboard")
    api.add_resource(StaffListResource, "/api/management/staff")
    api.add_resource(ManagementLogoutResource, "/api/management/logout")

    return app


app = create_app()

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
