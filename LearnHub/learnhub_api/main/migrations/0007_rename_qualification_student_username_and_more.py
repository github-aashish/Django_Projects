# Generated by Django 5.0.4 on 2024-05-08 10:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_teacher_detail_alter_course_teacher_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='student',
            old_name='qualification',
            new_name='username',
        ),
        migrations.RemoveField(
            model_name='student',
            name='address',
        ),
        migrations.RemoveField(
            model_name='student',
            name='mobile',
        ),
    ]
