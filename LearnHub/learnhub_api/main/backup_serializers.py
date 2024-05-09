from rest_framework import serializers
from . import models

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Teacher
        fields = ['id','full_name', 'email','password','qualification','mobile','skills','detail','teacher_courses','skill_list']
        depth = 1
        
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Student
        fields = ['id','full_name', 'username','email','password','interested_categories']
        
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CourseCategory
        fields = ['id','title', 'description']
        
class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Course
        fields = ['id','category', 'teacher','title','description','featured_image','technologies','course_modules','related_videos','technologies_list','total_enrolled_students','course_rating']
        depth = 1
        
class ModulesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Modules
        fields = ['id','course', 'title','description','video','remarks']
        
class CourseEnrollSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudentCourseEnrollment
        fields = ['id','course', 'student','enroll_time']
        depth = 1
        
class CourseRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CourseRating
        fields = ['id','course', 'student','rating','review','review_time']
        
        def __init__(self, *args, **kwargs):
            super(CourseRatingSerializer, self).__init__(*args, **kwargs)
            request = self.context.get('request')
            self.Meta.depth = 0
            if request and request.method == 'GET':
                self.Meta.depth = 1