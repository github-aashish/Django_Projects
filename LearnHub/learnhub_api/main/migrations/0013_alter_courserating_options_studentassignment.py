# Generated by Django 5.0.4 on 2024-05-10 06:11

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0012_studentfavouritecourse'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='courserating',
            options={'verbose_name_plural': 'Ratings'},
        ),
        migrations.CreateModel(
            name='StudentAssignment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('detail', models.TextField(null=True)),
                ('add_time', models.DateTimeField(auto_now_add=True)),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.student')),
                ('teacher', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.teacher')),
            ],
            options={
                'verbose_name_plural': 'Assignments',
            },
        ),
    ]
