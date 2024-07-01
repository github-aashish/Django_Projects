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
        fields = ['profile_image','total_enroll','total_favourite','total_completed','total_pending']
        

        
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
        # Dynamically set the depth based on the request method
        if self.context['request'].method == 'GET':
            serializer = self.__class__(instance, context=self.context)
            serializer.Meta.depth = 1
        else:
            serializer = self.__class__(instance, context=self.context)
            serializer.Meta.depth = 0

        # Call the to_representation method of the newly created serializer instance
        return super(CourseSerializer, serializer).to_representation(instance)
                
class StudentFavouriteCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudentFavouriteCourse
        fields = ['id', 'course', 'student', 'status']
        depth = 0  # default depth

    def __init__(self, *args, **kwargs):
        # Call the parent constructor
        super(StudentFavouriteCourseSerializer, self).__init__(*args, **kwargs)

        # Check if the context is available and contains the request
        if 'request' in self.context:
            # Set depth based on the request method
            self.Meta.depth = 2 if self.context['request'].method == 'GET' else 0
        
class ModulesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Modules
        fields = ['id','course', 'title','description','video','remarks']
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        request = self.context.get('request')
        if request and request.method == 'GET':
            self.Meta.depth = 1
        else:
            self.Meta.depth = 0
        
class CourseEnrollSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudentCourseEnrollment
        fields = ['id', 'course', 'student', 'enroll_time']

    def __init__(self, *args, **kwargs):
        # Call the parent constructor
        super(CourseEnrollSerializer, self).__init__(*args, **kwargs)

        # Check if the context is available and contains the request
        if 'request' in self.context:
            # Set depth based on the request method
            self.Meta.depth = 2 if self.context['request'].method == 'GET' else 0
        
    
        
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
        fields = ['id', 'teacher', 'student', 'title', 'detail', 'student_status', 'add_time']
        depth = 0

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        request = self.context.get('request')
        if request and request.method == 'GET':
            self.Meta.depth = 1
        else:
            self.Meta.depth = 0
                
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Notification
        fields = ['id','teacher', 'student','notif_subject','notif_for','notif_created_time','notif_read_status']
        
        
class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Quiz
        fields = ['id','teacher', 'title','detail','assign_status','add_time']
        
    def to_representation(self, instance):
        self.Meta.depth = 1 if self.context['request'].method != 'GET' else 0
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
        
    