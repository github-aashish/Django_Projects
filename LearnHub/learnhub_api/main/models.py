from django.db import models
from django.core import serializers


# Create your models here.
#Teacher Model
class Teacher(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    mobile = models.BigIntegerField()
    password = models.CharField(max_length=100)
    qualification = models.CharField(max_length=200)
    skills = models.TextField()
    detail = models.TextField(null=True)
    
    class Meta:
        verbose_name_plural = "Teachers"
        
    def __str__(self):
        return self.full_name
    
    def skill_list(self):
        skill_list = self.skills.split(',')
        return skill_list
    
#Student Model
class Student(models.Model):
    full_name = models.CharField(max_length=100)
    username = models.CharField(max_length=200)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=100)
    interested_categories = models.TextField()
    
    class Meta:
        verbose_name_plural = "Students"
        
    def __str__(self):
        return self.full_name
    
#Course Categories
class CourseCategory(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField()
    
    class Meta:
        verbose_name_plural = "Categories"
        
    def __str__(self):
        return self.title
    
#Course Model
class Course(models.Model):
    category = models.ForeignKey(CourseCategory, on_delete = models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete = models.CASCADE,related_name='teacher_courses')
    title = models.CharField(max_length=150)
    description = models.TextField()
    featured_image = models.ImageField(upload_to='courses_images/', null=True)
    technologies = models.TextField(null=True)
    
    class Meta:
        verbose_name_plural = "Courses"
    def __str__(self):
        return self.title
    
    def related_videos(self):
        related_videos = Course.objects.filter(technologies__icontains=self.technologies)
        return serializers.serialize('json', related_videos)
    
    def technologies_list(self):
        technologies_list = self.technologies.split(',')
        return technologies_list
    
    def total_enrolled_students(self):
        total_enrolled_students = StudentCourseEnrollment.objects.filter(course=self).count()
        return total_enrolled_students
    def course_rating(self):
        course_rating = CourseRating.objects.filter(course=self).aggregate(avg_rating=models.Avg('rating'))
        return course_rating['avg_rating']
        
#Videos
class Modules(models.Model):
    course = models.ForeignKey(Course, on_delete = models.CASCADE,related_name='course_modules')
    title = models.CharField(max_length=150)
    description = models.TextField()
    video = models.FileField(upload_to='module_videos/', null=True)
    remarks = models.TextField(null=True)
    
    class Meta:
        verbose_name_plural = "Videos"
        
    def __str__(self):
        return self.title
        
class StudentCourseEnrollment(models.Model):
    course = models.ForeignKey(Course, on_delete = models.CASCADE, related_name='enrolled_courses')
    student = models.ForeignKey(Student, on_delete = models.CASCADE, related_name='enrolled_student')
    enroll_time = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = "Enrollments"
    def __str__(self):
        return f"{self.course}" +" "+" "+"  |  "+ f"{self.student}"


#Course Review and Rating
class CourseRating(models.Model):
    course = models.ForeignKey(Course, on_delete = models.CASCADE)
    student = models.ForeignKey(Student, on_delete = models.CASCADE)
    rating = models.PositiveBigIntegerField(default=0)
    review = models.TextField(null=True)
    review_time = models.DateTimeField(auto_now_add=True)