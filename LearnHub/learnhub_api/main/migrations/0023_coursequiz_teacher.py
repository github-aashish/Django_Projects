# Generated by Django 5.0.4 on 2024-05-11 09:31

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0022_alter_quizquestions_ans1_alter_quizquestions_ans2_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='coursequiz',
            name='teacher',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='main.teacher'),
        ),
    ]
