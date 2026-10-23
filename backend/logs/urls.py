from django.urls import path

from .views import get_operators, get_alarm_types, get_clients, get_false_alarm_types, post_alarm_log, get_log_info, get_logs_page, get_form_data, get_logs_report

urlpatterns = [
    path("operators", get_operators),
    path("alarmtypes", get_alarm_types),
    path("clients", get_clients),
    path("falsealarmtypes", get_false_alarm_types),
    path("postlog", post_alarm_log),
    path("log/<int:id>", get_log_info),
    path("logs/<int:page>", get_logs_page),
    path("formdata", get_form_data),
    path("eport", get_logs_report)
]
