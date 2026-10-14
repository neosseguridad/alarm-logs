from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Operator, AlarmType, Client, FalseAlarmType, AlarmLog
import json
from django.core.paginator import Paginator
from django.utils import timezone

# Create your views here.
def get_operators(request):
    operators_list = []
    operators_queryset = Operator.objects.filter(is_active=True)
    for operator in operators_queryset:
        operators_list.append({
            "id" : operator.pk,
            "name" : f"{operator.last_name}, {operator.name}"
        })
    return HttpResponse(str(operators_list))

def get_alarm_types(request):
    alarm_types_list = []
    alarm_types_queryset = AlarmType.objects.filter(is_active=True)
    for alarm_type in alarm_types_queryset:
        alarm_types_list.append(alarm_type.name)
    return HttpResponse(str(alarm_types_list))

def get_clients(request):
    clients_list = []
    clients_queryset = Client.objects.filter(is_active=True)
    for client in clients_queryset:
        clients_list.append({
            "id" : client.pk,
            "name" : client.name
        })
    return HttpResponse(str(clients_list))

def get_false_alarm_types(request):
    false_alarm_types_list = []
    false_alarm_types_queryset = FalseAlarmType.objects.filter(is_active=True)
    for false_alarm_type in false_alarm_types_queryset:
        false_alarm_types_list.append(false_alarm_type.name)
    return HttpResponse(str(false_alarm_types_list))

@csrf_exempt
def post_alarm_log(request):
    if request.method=="POST":
        data = json.loads(request.body)
        operator = Operator.objects.get(pk=data["operator"])
        client = Client.objects.get(pk=data["client"])
        alarm_type = AlarmType.objects.get(pk=data["alarm_type"])
        user_answered = data["user_answered"]
        alarm_type_desc = None
        if "alarm_type_desc" in data:
            alarm_type_desc = data["alarm_type_desc"]
        real_emergency = None
        if "real_emergency" in data:
            real_emergency = data["real_emergency"]
        false_alarm_type = None
        if "false_alarm_type" in data:
            false_alarm_type = data["false_alarm_type"]
        false_alarm_type_desc = None
        if "false_alarm_type_desc" in data:
            false_alarm_type_desc = data["false_alarm_type_desc"]
        correct_password = None
        if "correct_password" in data:
            correct_password = data["correct_password"]
        correct_password_later = None
        if "correct_password_later" in data:
            correct_password_later = data["correct_password_later"]
        log = AlarmLog.objects.create(
            is_active = True,
            operator = operator,
            client = client,
            alarm_type = alarm_type,
            user_answered = user_answered,
            alarm_type_desc = alarm_type_desc,
            real_emergency = real_emergency,
            false_alarm_type = false_alarm_type,
            false_alarm_type_desc = false_alarm_type_desc,
            correct_password = correct_password,
            correct_password_later = correct_password_later
        )
        return HttpResponse(log)
    else:
        return(HttpResponse("Method not allowed"))

def get_log_info(request, id):
    try:
        log = AlarmLog.objects.get(pk=id, is_active=True)
        data = {
            "id" : log.pk,
            "datetime" : timezone.localtime(log.datetime).strftime("%Y/%m/%d %H:%M"),
            "operator" : f"{log.operator.last_name}, {log.operator.name}",
            "client" : log.client.name,
            "alarm_type" : log.alarm_type.name,
            "user_answered" : log.user_answered,
            "alarm_type_desc" : log.alarm_type_desc,
            "real_emergency" : log.real_emergency,
            "false_alarm_type" : log.false_alarm_type.name if log.false_alarm_type else None,
            "false_alarm_type_desc" : log.false_alarm_type_desc,
            "correct_password" : log.correct_password,
            "correct_password_later" : log.correct_password_later
        }
        return HttpResponse(json.dumps(data))
    except:
        return HttpResponse("not found")

def get_logs_page(request, page):
    queryset = AlarmLog.objects.filter(is_active=True)
    paginator = Paginator(queryset, 20)
    p = paginator.page(page)
    logs = []
    for log in p:
        logs.append({
            "id" : log.pk,
            "datetime" : timezone.localtime(log.datetime).strftime("%Y/%m/%d %H:%M"),
            "operator" : f"{log.operator.last_name}, {log.operator.name}",
            "client" : log.client.name
        })
    data = {
        "has_previous" : p.has_previous(),
        "has_next" : p.has_next(),
        "logs" : logs
    }

    return HttpResponse(json.dumps(data))
