from rest_framework import serializers
from . import models

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Teacher
        fields = ['id','full_name', 'email','password','qualification','mobile','skills','detail','profile_image','teacher_courses','skill_list']
        
    def to_representation(self, instance):
        self.Meta.depth = 1 if self.context['request'].method == 'GET' else 0
        return super().to_representation(instance)
                
class TeacherDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Teacher
        fields = ['total_teacher_courses','total_teacher_modules','total_teacher_students']

class StudentDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Student
        fields = ['total_enroll','total_favourite','total_completed','total_pending']
        

        
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Student
        fields = ['id','full_name', 'username','email','password','interested_categories','profile_image']
        
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CourseCategory
        fields = ['id','title', 'description']
        
class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Course
        fields = ['id','category', 'teacher','title','description','featured_image','technologies','course_modules','related_videos','technologies_list','total_enrolled_students','course_rating']
        
    def to_representation(self, instance):
        self.Meta.depth = 1 if self.context['request'].method == 'GET' else 0
        return super().to_representation(instance)
                
class StudentFavouriteCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudentFavouriteCourse
        fields = ['id','course','student','status']
        depth = 2
    
    def to_representation(self, instance):
        self.Meta.depth = 2 if self.context['request'].method == 'GET' else 0
        return super().to_representation(instance)
        
class ModulesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Modules
        fields = ['id','course', 'title','description','video','remarks']
        
class CourseEnrollSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudentCourseEnrollment
        fields = ['id','course', 'student','enroll_time']
        
    def to_representation(self, instance):
        self.Meta.depth = 2 if self.context['request'].method == 'GET' else 0
        return super().to_representation(instance)
        
    
        
class CourseRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CourseRating
        fields = ['id','course', 'student','rating','review','review_time']
        
    def to_representation(self, instance):
        self.Meta.depth = 1 if self.context['request'].method == 'GET' else 0
        return super().to_representation(instance)
                
                
class StudentAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudentAssignment
        fields = ['id','teacher','student','title','detail','student_status','add_time']
    
    def to_representation(self, instance):
        self.Meta.depth = 1 if self.context['request'].method == 'GET' else 0
        return super().to_representation(instance)
                
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Notification
        fields = ['id','teacher', 'student','notif_subject','notif_for','notif_created_time','notif_read_status']
        