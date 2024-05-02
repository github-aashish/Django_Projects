from django.db import models

# Create your models here.
#Teacher Model
class Teacher(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    mobile = models.BigIntegerField()
    password = models.CharField(max_length=100)
    qualification = models.CharField(max_length=200)
    skills = models.TextField()
    
    class Meta:
        verbose_name_plural = "Teachers"
    
#Student Model
class Student(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=100)
    qualification = models.CharField(max_length=200)
    mobile = models.BigIntegerField()
    address = models.TextField()
    interested_categories = models.TextField()
    
    class Meta:
        verbose_name_plural = "Students"
    
#Course Categories
class CourseCategory(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField()
    
    class Meta:
        verbose_name_plural = "Categories"
    
#Course Model
class Course(models.Model):
    category = models.ForeignKey(CourseCategory, on_delete = models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete = models.CASCADE)
    title = models.CharField(max_length=150)
    description = models.TextField()
    
    class Meta:
        verbose_name_plural = "Courses"
