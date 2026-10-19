from logs.models import Client, AlarmType, FalseAlarmType, Operator
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

from logs.models import Client, AlarmType, FalseAlarmType, Operator


class Command(BaseCommand):
    help = "Initialize the application with default data and an admin user"

    def handle(self, *args, **options):
        User = get_user_model()

        # Create the default superuser if it doesn't exist
        if not User.objects.filter(username="admin").exists():
            User.objects.create_superuser(
                username="admin",
                email="areati@neosseguridad.com",
                password="Neos1234",
            )
            self.stdout.write(
                self.style.SUCCESS("Superuser created successfully.")
            )
        else:
            self.stdout.write("Superuser already exists.")  
        self.stdout.write(
            self.style.SUCCESS("Application initialization complete.")
        )

        clients = [
        "SAFRESCO CHINCHA",
		"SAFRESCO CHEPEN",
		"COOPERATIVO AHORRO",
		"SUMAQAO"
	    "PROFUTURO AFP TRUJILLO",
		"INVERSIONES LA ECONÓMICA A & E",
		"DOGANA"
	    "COORPORACION WILSON ALVAREZ CONSULTING SAC",
		"DHL HUACHIPA",
		"DHL VES"
 	    "DHL MAX",
		"ELIO CHIHUAN",
		"CARLOS BOHORQUEZ",
		"EDIFC. DAVID ROCA",
		"EXALMAR"
        ]

        alarm_types = [
            "SEÑAL DE ZONA ACTIVADA",
            "PULSADOR DE PÁNICO",
            "FALLA DE SIRENA",
            "FALLA DE ENERGÍA ELÉCTRICA",
            "FALLA DE BATERÍA",
            "FALLA DE COMUNICADOR",
            "OTROS"
        ]

        false_alarm_types = [
            "ANIMALES RONDANDO",
            "AMBIENTAL",
            "OBSTRUCCIÓN",
            "PERSONAL TRANSITANDO",
            "ERROR HUMANO",
            "VERIFICACIÓN DE SENSORES",
            "OTROS"
        ]

        operators = [
            {"name" : "AARON", "last_name" : "CUZCANO"},
            {"name" : "JUAN", "last_name" : "ABARCA"},
            {"name" : "JOSÉ", "last_name" : "DEZA"}
        ]

        print("---CLIENTS-------------------------------")
        for client in clients:
            exists = Client.objects.filter(name = client).exists()
            if not exists:
                Client.objects.create(name=client, is_active=True)
                print(f"Created client {client}")
            else:
                print(f"Client {client} already exists")

        print("---ALARM TYPES-------------------------------")
        for alarm_type in alarm_types:
            exists = AlarmType.objects.filter(name__iexact = alarm_type).exists()
            if not exists:
                AlarmType.objects.create(name=alarm_type, is_active=True)
                print(f"Created alarm type {alarm_type}")
            else:
                print(f"Alarm type {alarm_type} already exists")

        print("---FALSE ALARM TYPES-------------------------------")
        for false_alarm_type in false_alarm_types:
            exists = FalseAlarmType.objects.filter(name=false_alarm_type).exists()
            if not exists:
                FalseAlarmType.objects.create(name=false_alarm_type, is_active=True)
                print(f"Created false alarm type {false_alarm_type}")
            else:
                print(f"False alarm type {false_alarm_type} already exists")

        print("---OPERATORS-------------------------------")
        for operator in operators:
            exists = Operator.objects.filter(name=operator["name"], last_name = operator["last_name"]).exists()
            if not exists:
                Operator.objects.create(name=operator["name"], last_name = operator["last_name"], is_active = True)
                print(f"Operator {operator["name"]} {operator["last_name"]} created")
            else:
                print(f"Operator {operator["name"]} {operator["last_name"]} already exists")