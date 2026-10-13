from django.db import models

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
    is_active = True

    class Meta:
        db_table = "alarm_type"
        verbose_name = "Alarm Type"
        verbose_name_plural = "Alarm Types"
        ordering = ["name"]

    def __str__(self):
        return self.name4

class FalseAlarmType(models.Model):
    name = models.CharField(max_length=50, null=False)
    is_active = True

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
    alarm_type = models.CharField(max_length=50)
    user_answered = models.BooleanField()
    real_emergency = models.BooleanField()
    false_alarm_type = models.CharField(max_length=50)
    correct_password = models.BooleanField()
    correct_password_later = models.BooleanField()
    is_active = models.BooleanField(default=True)

    class Meta():
        db_table = "alarm_log"
        verbose_name = "Alarm Log"
        verbose_name_plural = "Alarm Logs"
        ordering = ["-datetime"]

    def __str__(self):
        return f"{str(self.datetime)} - {str(self.operator)}"