from django.db import models
from django.utils import timezone

# Create your models here.
class Operator(models.Model):
    name = models.CharField(max_length=50, null=False)
    last_name = models.CharField(max_length=50, null=False)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = 'operator'
        verbose_name = 'Operator'
        verbose_name_plural = 'Operators'
        ordering = ["last_name"]

    def __str__(self):
        return f"{self.last_name}, {self.name}"

class Client(models.Model):
    name = models.CharField(max_length=50, null=False)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "client"
        verbose_name = "Client"
        verbose_name_plural = "Clients"
        ordering = ["name"]

    def __str__(self):
        return self.name

class AlarmType(models.Model):
    name = models.CharField(max_length=50, null=False)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "alarm_type"
        verbose_name = "Alarm Type"
        verbose_name_plural = "Alarm Types"
        ordering = ["name"]

    def __str__(self):
        return self.name

class FalseAlarmType(models.Model):
    name = models.CharField(max_length=50, null=False)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "false_alarm_type"
        verbose_name = "False Alarm Type"
        verbose_name_plural = "False Alarm Types"
        ordering = ["name"]

    def __str__(self):
        return self.name

class AlarmLog(models.Model):
    datetime = models.DateTimeField(auto_now_add=True, editable=False)
    operator = models.ForeignKey(Operator, on_delete=models.PROTECT, null=False)
    client = models.ForeignKey(Client, on_delete=models.PROTECT, null=False)
    alarm_type = models.ForeignKey(AlarmType, on_delete=models.PROTECT, null=False)
    alarm_type_desc = models.CharField(max_length=50, null=True, blank=True)
    user_answered = models.BooleanField(null=False)
    user_name = models.CharField(max_length=50, null=True, blank=True)
    real_emergency = models.BooleanField(null=True)
    false_alarm_type = models.ForeignKey(FalseAlarmType, on_delete=models.PROTECT, null=True, blank=True)
    false_alarm_type_desc = models.CharField(max_length=50, null=True, blank=True)
    correct_password = models.BooleanField(null=True)
    correct_password_later = models.BooleanField(null=True)
    is_active = models.BooleanField(default=True)

    class Meta():
        db_table = "alarm_log"
        verbose_name = "Alarm Log"
        verbose_name_plural = "Alarm Logs"
        ordering = ["-datetime"]

    def __str__(self):
        return f"{timezone.localtime(self.datetime).strftime("%Y/%m/%d %H:%M")} - {str(self.client)}"