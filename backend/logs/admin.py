from django.contrib import admin

from .models import Operator, Client, AlarmType, FalseAlarmType, AlarmLog

# Register your models here.
class OperatorAdmin(admin.ModelAdmin):
    list_display = ("last_name", "name", "is_active")
    search_fields = ("last_name", "name")

admin.site.register(Operator, OperatorAdmin)

class ClientAdmin(admin.ModelAdmin):
    list_display = ("name", "is_active")
    search_fields = ("name",)

admin.site.register(Client, ClientAdmin)

class AlarmTypeAdmin(admin.ModelAdmin):
    list_display = ("name", "is_active")
    search_fields = ("name",)

admin.site.register(AlarmType, AlarmTypeAdmin)

class FalseAlarmTypeAdmin(admin.ModelAdmin):
    list_display = ("name", "is_active")
    search_fields = ("name",)
    
admin.site.register(FalseAlarmType, FalseAlarmTypeAdmin)

class AlarmLogAdmin(admin.ModelAdmin):
    list_display = ("datetime", "operator", "client", "is_active")
    search_fields = ("operator", "client")
    readonly_fields = ("datetime",)

admin.site.register(AlarmLog, AlarmLogAdmin)