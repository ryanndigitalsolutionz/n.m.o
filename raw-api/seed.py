from datetime import date, datetime, timedelta
import secrets

from app import create_app
from extensions import db

from models.user import User
from models.mining_site import MiningSite
from models.mineral import Mineral
from models.vehicle import Vehicle
from models.certificate import Certificate
from models.harvest_record import HarvestRecord
from models.shipment import Shipment
from models.site_record import SiteRecord
from models.invitation import Invitation
from models.settings import Settings

app = create_app()

with app.app_context():

    db.drop_all()
    db.create_all()

    # ---------------- USERS ----------------

    admin = User(
        username="Ryan Makori",
        email="ryan.makori@student.moringaschool.com",
        role="admin"
    )
    admin.password = "Admin123!"

    manager = User(
        username="James Karanja",
        email="james.karanja4@student.moringaschool.com",
        role="manager"
    )
    manager.password = "Manager123!"

    inspector = User(
        username="Emmanuel Sum",
        email="emmanuel.sum@student.moringaschool.com",
        role="inspector"
    )
    inspector.password = "Inspector123!"

    db.session.add_all([
        admin,
        manager,
        inspector
    ])

    db.session.commit()

    # ---------------- SETTINGS ----------------

    settings = [

    Settings(
        user_id=admin.user_id,
        email_notifications=True,
        shipment_alerts=True,
        certification_renewals=False,
        royalty_notifications=True,
        two_factor_auth=False,
        login_alerts=True
    ),

    Settings(
        user_id=manager.user_id,
        email_notifications=True,
        shipment_alerts=True,
        certification_renewals=True,
        royalty_notifications=True,
        two_factor_auth=True,
        login_alerts=True
    ),

    Settings(
        user_id=inspector.user_id,
        email_notifications=False,
        shipment_alerts=True,
        certification_renewals=True,
        royalty_notifications=False,
        two_factor_auth=False,
        login_alerts=True
    )

    ]

    db.session.add_all(settings)
    db.session.commit()

    # ---------------- MINERALS ----------------

    titanium = Mineral(
        mineral_name="Titanium",
        category="Metal",
        unit="Tonnes",
        description="High-grade titanium ore."
    )

    zircon = Mineral(
        mineral_name="Zircon",
        category="Industrial Mineral",
        unit="Tonnes",
        description="Premium zircon concentrate."
    )

    rutile = Mineral(
        mineral_name="Rutile",
        category="Titanium Mineral",
        unit="Tonnes",
        description="Natural rutile deposits."
    )

    ilmenite = Mineral(
        mineral_name="Ilmenite",
        category="Titanium Ore",
        unit="Tonnes",
        description="Primary titanium-bearing mineral."
    )

    monazite = Mineral(
        mineral_name="Monazite",
        category="Rare Earth Mineral",
        unit="Tonnes",
        description="Rare earth phosphate mineral."
    )

    db.session.add_all([
        titanium,
        zircon,
        rutile,
        ilmenite,
        monazite
    ])

    db.session.commit()

        # ---------------- MINING SITES ----------------

    mrima_hills = MiningSite(
        site_name="Mrima Hills",
        county="Kwale",
        latitude=-4.484722,
        longitude=39.242500,
        depth="120 m",
        area="12.5 km²",
        yield_estimate="45,000 tonnes/year",
        water_table="18 m",
        status="Active",
        mineral_type="Niobium and Corrosive Thorium",
        security_level="Guarded/Restricted",
        description="A nationally significant rare earth mining reserve containing niobium and thorium deposits. The area includes protected cultural and ecological zones monitored under government regulations.",
        nearby_population="Surrounded by the Digo community with several villages within a 15 km radius."
    )

    sector_3a = MiningSite(
        site_name="Sector 3A",
        county="Kwale",
        latitude=-4.486210,
        longitude=39.244380,
        depth="95 m",
        area="7.2 km²",
        yield_estimate="22,000 tonnes/year",
        water_table="16 m",
        status="Active",
        mineral_type="Rare Earth Elements",
        security_level="Guarded/Restricted",
        description="Primary extraction zone for rare earth elements with active excavation equipment and mineral processing facilities operating daily.",
        nearby_population="Nearest settlements are small mining communities supporting the site's workforce."
    )

    sector_5c = MiningSite(
        site_name="Sector 5C",
        county="Kwale",
        latitude=-4.489910,
        longitude=39.246020,
        depth="140 m",
        area="9.8 km²",
        yield_estimate="38,000 tonnes/year",
        water_table="20 m",
        status="Maintenance",
        mineral_type="Rare Earth Elements",
        security_level="Guarded/Restricted",
        description="Temporary maintenance sector undergoing equipment inspection and geological reassessment before reopening.",
        nearby_population="Minimal civilian activity due to restricted maintenance operations."
    )

    sector_7b = MiningSite(
        site_name="Sector 7B",
        county="Kwale",
        latitude=-4.492880,
        longitude=39.249100,
        depth="110 m",
        area="8.4 km²",
        yield_estimate="30,000 tonnes/year",
        water_table="17 m",
        status="Active",
        mineral_type="Rare Earth Elements",
        security_level="Guarded/Restricted",
        description="High-yield production block containing concentrated rare earth deposits used for commercial extraction.",
        nearby_population="Workers' camp and nearby villages provide logistical support for the operation."
    )

    sector_9d = MiningSite(
        site_name="Sector 9D",
        county="Kwale",
        latitude=-4.496540,
        longitude=39.252730,
        depth="150 m",
        area="10.1 km²",
        yield_estimate="41,000 tonnes/year",
        water_table="23 m",
        status="Exploration",
        mineral_type="Rare Earth Elements",
        security_level="Guarded/Restricted",
        description="Exploration sector where geological surveys and drilling are being conducted to evaluate future mining potential.",
        nearby_population="Located near sparsely populated woodland with limited permanent settlements."
    )

    migori_gold_belt = MiningSite(
        site_name="Migori Gold Belt",
        county="Migori",
        latitude=-1.070000,
        longitude=34.470000,
        depth="180 m",
        area="15.4 km²",
        yield_estimate="28,000 tonnes/year",
        water_table="24 m",
        status="Active",
        mineral_type="Diatomite and Limestone",
        security_level="Under Maintenance",
        description="Historic gold mining region with licensed extraction zones and ongoing commercial exploration.",
        nearby_population="Adjacent to several rural communities with a large artisanal mining workforce."
    )

    kakamega_gold_fields = MiningSite(
        site_name="Kakamega Gold Fields",
        county="Kakamega",
        latitude=0.280000,
        longitude=34.750000,
        depth="95 m",
        area="9.6 km²",
        yield_estimate="18,000 tonnes/year",
        water_table="19 m",
        status="Exploration",
        mineral_type="Gold and Phosphate",
        security_level="Exploring",
        description="Emerging exploration area targeting gold and phosphate deposits through geological drilling.",
        nearby_population="Bordered by agricultural communities and protected forest reserves."
    )

    taita_hills = MiningSite(
        site_name="Taita Hills",
        county="Taita Taveta",
        latitude=-3.370000,
        longitude=38.350000,
        depth="135 m",
        area="11.8 km²",
        yield_estimate="31,000 tonnes/year",
        water_table="22 m",
        status="Active",
        mineral_type="Gemstones",
        security_level="Restricted",
        description="Gemstone-rich mountain range producing a variety of semi-precious minerals under controlled mining licenses.",
        nearby_population="Nearby Taita communities rely on tourism and small-scale agriculture."
    )

    lokichar_basin = MiningSite(
        site_name="Lokichar Basin",
        county="Turkana",
        latitude=3.200000,
        longitude=35.600000,
        depth="240 m",
        area="26.5 km²",
        yield_estimate="60,000 tonnes/year",
        water_table="30 m",
        status="Active",
        mineral_type="Rare Earth Elements",
        security_level="Guarded",
        description="Strategic energy and mineral basin supporting exploration of rare earth deposits alongside petroleum infrastructure.",
        nearby_population="Scattered pastoral settlements primarily inhabited by the Turkana community."
    )

    geita_mine = MiningSite(
        site_name="Geita Mine",
        county="Geita, Tanzania",
        latitude=-2.870000,
        longitude=32.180000,
        depth="210 m",
        area="18.7 km²",
        yield_estimate="72,000 tonnes/year",
        water_table="28 m",
        status="Active",
        mineral_type="Copper and Marble",
        security_level="Guarded",
        description="Large-scale commercial mining complex with advanced extraction and mineral processing facilities.",
        nearby_population="Located close to Geita town, supporting thousands of workers and their families."
    )

    mererani_hills = MiningSite(
        site_name="Mererani Hills",
        county="Manyara, Tanzania",
        latitude=-3.560000,
        longitude=36.960000,
        depth="145 m",
        area="8.3 km²",
        yield_estimate="14,000 tonnes/year",
        water_table="20 m",
        status="Unused",
        mineral_type="Rare Earth Elements",
        security_level="Exploring",
        description="Protected mineral reserve currently inactive while geological assessments continue for future development.",
        nearby_population="Small Tanzanian settlements with limited industrial activity nearby."
    )

    kilembe_mines = MiningSite(
        site_name="Kilembe Mines",
        county="Kasese, Uganda",
        latitude=0.190000,
        longitude=30.020000,
        depth="170 m",
        area="13.6 km²",
        yield_estimate="26,000 tonnes/year",
        water_table="26 m",
        status="Maintenance",
        mineral_type="Diamonds and Cobalt",
        security_level="Under Maintenance",
        description="Historic copper mining complex undergoing rehabilitation and infrastructure upgrades.",
        nearby_population="Close to Kasese municipality and communities supporting restoration projects."
    )

    kolwezi_copper_belt = MiningSite(
        site_name="Kolwezi Copper Belt",
        county="Lualaba, DR Congo",
        latitude=-10.710000,
        longitude=25.470000,
        depth="320 m",
        area="32.4 km²",
        yield_estimate="110,000 tonnes/year",
        water_table="42 m",
        status="Active",
        mineral_type="Copper and Chromium",
        security_level="Guarded",
        description="One of Africa's largest copper production regions with extensive industrial mining operations.",
        nearby_population="Dense mining settlements and urban communities surround the industrial zone."
    )

    tenke_fungurume = MiningSite(
        site_name="Tenke Fungurume",
        county="Lualaba, DR Congo",
        latitude=-10.620000,
        longitude=26.320000,
        depth="290 m",
        area="29.8 km²",
        yield_estimate="98,000 tonnes/year",
        water_table="38 m",
        status="Active",
        mineral_type="Rare Earth Elements",
        security_level="Guarded",
        description="World-renowned copper and rare earth mining operation utilizing modern extraction technologies.",
        nearby_population="Purpose-built residential communities support thousands of employees."
    )

    musha_mine = MiningSite(
        site_name="Musha Mine",
        county="Eastern Province, Rwanda",
        latitude=-1.850000,
        longitude=30.510000,
        depth="115 m",
        area="7.1 km²",
        yield_estimate="19,000 tonnes/year",
        water_table="18 m",
        status="Active",
        mineral_type="Rare Earth Elements",
        security_level="Restricted",
        description="Rwandan mineral extraction site focusing on rare earth resources under environmentally controlled operations.",
        nearby_population="Located near farming communities with regulated mining access."
    )

    db.session.add_all([
        mrima_hills,
        sector_3a,
        sector_5c,
        sector_7b,
        sector_9d,
        migori_gold_belt,
        kakamega_gold_fields,
        taita_hills,
        lokichar_basin,
        geita_mine,
        mererani_hills,
        kilembe_mines,
        kolwezi_copper_belt,
        tenke_fungurume,
        musha_mine
    ])

    db.session.commit()

    # ---------------- VEHICLES ----------------

    vehicles = [

    Vehicle(
        site_id=mrima_hills.site_id,
        registration_number="KDM201A",
        vehicle_type="Dump Truck",
        capacity=35,
        status="Available"
    ),

    Vehicle(
        site_id=sector_3a.site_id,
        registration_number="KDN118B",
        vehicle_type="Excavator",
        capacity=22,
        status="Operating"
    ),

    Vehicle(
        site_id=sector_5c.site_id,
        registration_number="KDP442X",
        vehicle_type="Wheel Loader",
        capacity=18,
        status="Maintenance"
    ),

    Vehicle(
        site_id=sector_7b.site_id,
        registration_number="KDT903L",
        vehicle_type="Tipper Truck",
        capacity=30,
        status="Available"
    ),

    Vehicle(
        site_id=sector_9d.site_id,
        registration_number="KDX741M",
        vehicle_type="Bulldozer",
        capacity=40,
        status="Operating"
    )
]
    
    db.session.add_all(vehicles)
    db.session.commit()

# ---------------- CERTIFICATES ----------------

    certificates = [

    Certificate(
        site_id=mrima_hills.site_id,
        certificate_number="CERT-001",
        certificate_name="ISO 14001",
        category="Environmental",
        issuer="SGS Kenya",
        description="Environmental management certification.",
        issued_date=date(2023,3,15),
        expiry_date=date(2026,3,15),
        status="Active"
    ),

    Certificate(
        site_id=mrima_hills.site_id,
        certificate_number="CERT-002",
        certificate_name="ISO 9001",
        category="Quality",
        issuer="Bureau Veritas",
        description="Quality management certification.",
        issued_date=date(2023,1,10),
        expiry_date=date(2026,1,10),
        status="Active"
    ),

    Certificate(
        site_id=mrima_hills.site_id,
        certificate_number="CERT-003",
        certificate_name="OHSAS 18001",
        category="Safety",
        issuer="TUV Rheinland",
        description="Occupational safety certification.",
        issued_date=date(2023,6,20),
        expiry_date=date(2026,6,20),
        status="Active"
    ),

    Certificate(
        site_id=mrima_hills.site_id,
        certificate_number="CERT-004",
        certificate_name="Fairmined",
        category="Ethical",
        issuer="Alliance for Responsible Mining",
        description="Responsible mining certification.",
        issued_date=date(2022,8,1),
        expiry_date=date(2024,8,1),
        status="Renewal"
    ),

    Certificate(
        site_id=mrima_hills.site_id,
        certificate_number="CERT-005",
        certificate_name="Conflict-Free",
        category="Supply Chain",
        issuer="RMI",
        description="Conflict-free minerals certification.",
        issued_date=date(2024,1,5),
        expiry_date=date(2025,1,5),
        status="Active"
    ),

    Certificate(
        site_id=mrima_hills.site_id,
        certificate_number="CERT-006",
        certificate_name="Carbon Neutral",
        category="Sustainability",
        issuer="South Pole",
        description="Carbon neutrality certification.",
        issued_date=date(2024,2,15),
        expiry_date=date(2025,2,15),
        status="Pending"
    )

]

    db.session.add_all(certificates)
    db.session.commit()

        # ---------------- HARVEST RECORDS ----------------

    harvest_records = [

        HarvestRecord(
            site_id=sector_7b.site_id,
            mineral_id=titanium.mineral_id,
            batch_code="HB-2024-089",
            quantity=850,
            grade="92%",
            method="Open Pit",
            status="Processed",
            harvest_date=date(2024, 6, 20)
        ),

        HarvestRecord(
            site_id=sector_9d.site_id,
            mineral_id=zircon.mineral_id,
            batch_code="HB-2024-088",
            quantity=420,
            grade="88%",
            method="Dredging",
            status="Processed",
            harvest_date=date(2024, 6, 18)
        ),

        HarvestRecord(
            site_id=sector_7b.site_id,
            mineral_id=rutile.mineral_id,
            batch_code="HB-2024-087",
            quantity=310,
            grade="95%",
            method="Open Pit",
            status="Processed",
            harvest_date=date(2024, 6, 15)
        ),

        HarvestRecord(
            site_id=sector_3a.site_id,
            mineral_id=ilmenite.mineral_id,
            batch_code="HB-2024-086",
            quantity=680,
            grade="85%",
            method="Dredging",
            status="Processed",
            harvest_date=date(2024, 6, 12)
        ),

        HarvestRecord(
            site_id=sector_3a.site_id,
            mineral_id=monazite.mineral_id,
            batch_code="HB-2024-085",
            quantity=150,
            grade="78%",
            method="Open Pit",
            status="Processing",
            harvest_date=date(2024, 6, 10)
        ),

        HarvestRecord(
            site_id=sector_7b.site_id,
            mineral_id=titanium.mineral_id,
            batch_code="HB-2024-084",
            quantity=920,
            grade="93%",
            method="Open Pit",
            status="Processed",
            harvest_date=date(2024, 6, 8)
        )

    ]

    db.session.add_all(harvest_records)
    db.session.commit()

    # ---------------- SHIPMENTS ----------------

    shipments = [

        Shipment(
            site_id=mrima_hills.site_id,
            vehicle_id=vehicles[0].vehicle_id,
            shipment_code="SHP-2024-001",
            origin="Mrima Hills",
            destination="Mombasa Port",
            cargo="Ilmenite Concentrate",
            quantity=2500,
            vessel="MV African Star",
            shipment_date=date(2024, 6, 15),
            estimated_arrival=date(2024, 6, 18),
            status="In Transit"
        ),

        Shipment(
            site_id=mrima_hills.site_id,
            vehicle_id=vehicles[1].vehicle_id,
            shipment_code="SHP-2024-002",
            origin="Mrima Hills",
            destination="Dar es Salaam",
            cargo="Rutile Sand",
            quantity=1200,
            vessel="MV Indian Ocean",
            shipment_date=date(2024, 6, 10),
            estimated_arrival=date(2024, 6, 13),
            status="Delivered"
        ),

        Shipment(
            site_id=mrima_hills.site_id,
            vehicle_id=vehicles[2].vehicle_id,
            shipment_code="SHP-2024-003",
            origin="Mrima Hills",
            destination="Durban",
            cargo="Zircon Sand",
            quantity=800,
            vessel="MV Cape Hope",
            shipment_date=date(2024, 6, 25),
            estimated_arrival=date(2024, 7, 2),
            status="Pending"
        ),

        Shipment(
            site_id=mrima_hills.site_id,
            vehicle_id=vehicles[3].vehicle_id,
            shipment_code="SHP-2024-004",
            origin="Mrima Hills",
            destination="Mombasa Port",
            cargo="Titanium Slag",
            quantity=3100,
            vessel="MV Kenya Pride",
            shipment_date=date(2024, 6, 18),
            estimated_arrival=date(2024, 6, 21),
            status="In Transit"
        ),

        Shipment(
            site_id=mrima_hills.site_id,
            vehicle_id=vehicles[4].vehicle_id,
            shipment_code="SHP-2024-005",
            origin="Mrima Hills",
            destination="Lagos",
            cargo="Monazite Concentrate",
            quantity=450,
            vessel="MV West Africa",
            shipment_date=date(2024, 6, 5),
            estimated_arrival=date(2024, 6, 12),
            status="Delivered"
        )

    ]

    db.session.add_all(shipments)
    db.session.commit()

    # ---------------- SITE RECORDS ----------------

    site_records = [

        SiteRecord(
            user_id=admin.user_id,
            site_id=sector_7b.site_id,
            mineral_id=titanium.mineral_id,
            record_type="Harvest",
            quantity=850,
            record_date=date(2024, 6, 20),
            notes="High-grade titanium successfully harvested."
        ),

        SiteRecord(
            user_id=manager.user_id,
            site_id=sector_9d.site_id,
            mineral_id=zircon.mineral_id,
            record_type="Inspection",
            quantity=None,
            record_date=date(2024, 6, 18),
            notes="Routine inspection completed."
        ),

        SiteRecord(
            user_id=inspector.user_id,
            site_id=sector_5c.site_id,
            mineral_id=ilmenite.mineral_id,
            record_type="Maintenance",
            quantity=None,
            record_date=date(2024, 6, 16),
            notes="Loader maintenance performed."
        ),

        SiteRecord(
            user_id=manager.user_id,
            site_id=sector_3a.site_id,
            mineral_id=monazite.mineral_id,
            record_type="Harvest",
            quantity=150,
            record_date=date(2024, 6, 10),
            notes="Monazite batch recorded."
        ),

        SiteRecord(
            user_id=admin.user_id,
            site_id=mrima_hills.site_id,
            mineral_id=titanium.mineral_id,
            record_type="Shipment",
            quantity=2500,
            record_date=date(2024, 6, 15),
            notes="Shipment dispatched to Mombasa Port."
        )

    ]

    db.session.add_all(site_records)
    db.session.commit()

        # ---------------- INVITATIONS ----------------

    invitations = [

        Invitation(
            email="new.worker@student.moringaschool.com",
            role="worker",
            token=secrets.token_urlsafe(32),
            accepted=False,
            invited_by=admin.user_id,
            expires_at=datetime.utcnow() + timedelta(days=2)
        ),

        Invitation(
            email="new.inspector@student.moringaschool.com",
            role="inspector",
            token=secrets.token_urlsafe(32),
            accepted=False,
            invited_by=admin.user_id,
            expires_at=datetime.utcnow() + timedelta(days=2)
        ),

        Invitation(
            email="new.manager@student.moringaschool.com",
            role="manager",
            token=secrets.token_urlsafe(32),
            accepted=False,
            invited_by=admin.user_id,
            expires_at=datetime.utcnow() + timedelta(days=2)
        )

    ]

    db.session.add_all(invitations)
    db.session.commit()

    print("Database seeded successfully!")
