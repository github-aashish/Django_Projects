# Generated by Django 5.0.4 on 2024-06-23 06:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0026_attemptedquiz_quiz'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='profile_image',
            field=models.ImageField(default='teachers_images/default.png', upload_to='student_images'),
        ),
        migrations.AlterField(
            model_name='teacher',
            name='profile_image',
            field=models.ImageField(default='teachers_images/default.png', upload_to='teachers_images'),
        ),
    ]
