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
    
    def to_representation(self, instance):
        self.Meta.depth = 0 if self.context['request'].method != 'GET' else 1
        return super().to_representation(instance)
        
class ModulesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Modules
        fields = ['id','course', 'title','description','video','remarks']
    def to_representation(self, instance):
        self.Meta.depth = 1 if self.context['request'].method == 'GET' else 0
        return super().to_representation(instance)
        
class CourseEnrollSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudentCourseEnrollment
        fields = ['id','course', 'student','enroll_time']
        
    def to_representation(self, instance):
        self.Meta.depth = 0 if self.context['request'].method != 'GET' else 2
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
        self.Meta.depth = 0 if self.context['request'].method != 'GET' else 1
        return super().to_representation(instance)
                
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Notification
        fields = ['id','teacher', 'student','notif_subject','notif_for','notif_created_time','notif_read_status']
        
        
class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Quiz
        fields = ['id','teacher', 'title','detail','assign_status','add_time']
        
    def to_representation(self, instance):
        self.Meta.depth = 1 if self.context['request'].method == 'GET' else 0
        return super().to_representation(instance)



class QuizQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.QuizQuestions
        fields = ['id','quiz','question', 'ans1','ans2','ans3','ans4','right_ans']
        
    
class CourseQuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CourseQuiz
        fields = ['id','teacher','course', 'quiz','add_time']
        
    def to_representation(self, instance):
        self.Meta.depth = 1 if self.context['request'].method == 'GET' else 0
        return super().to_representation(instance)
    
class AttemptedQuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AttemptedQuiz
        fields = ['id','student','question','quiz','submitted_answer','add_time']
        
    def to_representation(self, instance):
        self.Meta.depth = 1 if self.context['request'].method == 'GET' else 0
        return super().to_representation(instance)
        
    