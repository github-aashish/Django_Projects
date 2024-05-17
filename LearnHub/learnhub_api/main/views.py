from django.shortcuts import render
from rest_framework.views import APIView
from django.http import JsonResponse,HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import permissions
from .serializers import TeacherSerializer, CategorySerializer, CourseSerializer, ModulesSerializer,StudentSerializer,CourseEnrollSerializer,CourseRatingSerializer,TeacherDashboardSerializer,StudentFavouriteCourseSerializer,StudentAssignmentSerializer,StudentDashboardSerializer,NotificationSerializer,QuizSerializer,QuizQuestionSerializer,CourseQuizSerializer,AttemptedQuizSerializer
from . import models


# Create your views here.
class TeacherList(generics.ListCreateAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherSerializer
    #permission_classes = [permissions.IsAuthenticated]

class TeacherpopularList(generics.ListCreateAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherSerializer
    #permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        qs = super().get_queryset()
        if 'result' in self.request.GET:
            limit = int(self.request.GET['result'])
            qs = models.Teacher.objects.all().order_by('-id')[:limit]
        return qs
    
class TeacherDashboard(generics.RetrieveAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherDashboardSerializer
    #permission_classes = [permissions.IsAuthenticated]
    
    
    
class StudentList(generics.ListCreateAPIView):
    queryset = models.Student.objects.all()
    serializer_class = StudentSerializer
    #permission_classes = [permissions.IsAuthenticated]
    
class StudentDashboard(generics.RetrieveAPIView):
    queryset = models.Student.objects.all()
    serializer_class = StudentDashboardSerializer
    #permission_classes = [permissions.IsAuthenticated]
    
    
class TeacherDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherSerializer
    #permission_classes = [permissions.IsAuthenticated]
    
class StudentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Student.objects.all()
    serializer_class = StudentSerializer
    #permission_classes = [permissions.IsAuthenticated]
    
    
@csrf_exempt
def teacher_login(request):
    email = request.POST['email']
    password = request.POST['password']
    try:
        teacherData = models.Teacher.objects.get(email = email, password = password) 
    except:
        teacherData = None
    
    if teacherData is not None:
        return JsonResponse({'bool':True,'teacher_id':teacherData.id,'name':teacherData.full_name})
    else:
        return JsonResponse({'bool':False})
    
@csrf_exempt
def student_login(request):
    email = request.POST['email']
    password = request.POST['password']
    try:
        studentData = models.Student.objects.get(email = email, password = password) 
    except:
        studentData = None
    
    if studentData is not None:
        return JsonResponse({'bool':True,'student_id':studentData.id,'name':studentData.full_name})
    else:
        return JsonResponse({'bool':False})
    

class CategoryList(generics.ListCreateAPIView):
    queryset = models.CourseCategory.objects.all()
    serializer_class = CategorySerializer
    #permission_classes = [permissions.IsAuthenticated]
    
class CourseList(generics.ListCreateAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseSerializer
    #permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        qs = super().get_queryset()
        if 'result' in self.request.GET:
            limit = int(self.request.GET['result'])
            qs = models.Course.objects.all().order_by('-id')[:limit]


        if 'result-popular' in self.request.GET:
            limit = int(self.request.GET['result-popular'])
            qs = models.Course.objects.all().order_by('id')[:limit]
                        
        if 'category' in self.request.GET:
            category = self.request.GET['category']
            qs = models.Course.objects.filter(technologies__icontains=category)
            
        if 'searchstring' in self.kwargs:
            search = self.kwargs['searchstring']
            if search:
                qs = models.Course.objects.filter(Q(technologies__icontains=search) | Q(title__icontains=search))
            
        if 'skill_name' in self.request.GET and 'teacher' in self.request.GET:
            skill_name = self.request.GET['skill_name']
            teacher = self.request.GET['teacher']
            teacher = models.Teacher.objects.filter(id=teacher).first()
            qs = models.Course.objects.filter(technologies__icontains=skill_name,teacher=teacher)
       

        elif 'studentId' in self.kwargs:
            student_id = self.kwargs['studentId']
            student = models.Student.objects.get(pk = student_id )
            #print(student.interested_categories)
            queries = [Q(technologies__iendswith=value) for value in student.interested_categories]
            query = queries.pop()
            for item in queries:
                query |= item
            qs =  models.Course.objects.filter(query)
            #print(qs.query)
            return qs
            
        return qs
    
class StudentFavouriteCourseList(generics.ListCreateAPIView):
    queryset = models.StudentFavouriteCourse.objects.all()
    serializer_class = StudentFavouriteCourseSerializer
    
    def get_queryset(self):
        if 'student_id' in self.kwargs:
            student_id = self.kwargs['student_id']
            student = models.Student.objects.get(pk = student_id )
            return models.StudentFavouriteCourse.objects.filter(student=student).distinct()
    
        
def fetch_favourite_status(request,student_id,course_id):
    student = models.Student.objects.filter(id=student_id).first()
    course = models.Course.objects.filter(id=course_id).first()
    favouriteStatus = models.StudentFavouriteCourse.objects.filter(course=course,student=student).first()
    if favouriteStatus and favouriteStatus.status == True:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})
    
def remove_favourite_course(request,course_id,student_id):
    student = models.Student.objects.filter(id=student_id).first()
    course = models.Course.objects.filter(id=course_id).first()
    favouriteStatus = models.StudentFavouriteCourse.objects.filter(course=course,student=student).delete()
    if favouriteStatus :
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})
    
    
class CourseDetailList(generics.RetrieveAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseSerializer    
    
class TeacherCourseList(generics.ListCreateAPIView):
    serializer_class = CourseSerializer
    #permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        teacher_id = self.kwargs['teacher_id']
        teacher = models.Teacher.objects.get(pk = teacher_id )
        return models.Course.objects.filter(teacher=teacher)
    
    
class TeacherCourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseSerializer

class ModulesList(generics.ListCreateAPIView):   
    queryset = models.Modules.objects.all()
    serializer_class = ModulesSerializer
    #permission_classes = [permissions.IsAuthenticated]
    
    
class CourseModuleList(generics.ListAPIView):
    serializer_class = ModulesSerializer
    #permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        course_id = self.kwargs['course_id']
        course = models.Course.objects.get(pk = course_id )
        return models.Modules.objects.filter(course=course)
    
class ModuleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Modules.objects.all()
    serializer_class = ModulesSerializer
    #permission_classes = [permissions.IsAuthenticated]
    
class EnrollCourseList(generics.ListCreateAPIView):
    queryset = models.StudentCourseEnrollment.objects.all()
    serializer_class = CourseEnrollSerializer
    #permission_classes = [permissions.IsAuthenticated]
    
#fetch Enroll Students
def fetch_enroll_status(request,student_id,course_id):
    student = models.Student.objects.filter(id=student_id).first()
    course = models.Course.objects.filter(id=course_id).first()
    enrollStatus = models.StudentCourseEnrollment.objects.filter(course=course,student=student).count()
    if enrollStatus:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})

class EnrolledStudentsList(generics.ListAPIView):
    queryset = models.StudentCourseEnrollment.objects.all()
    serializer_class = CourseEnrollSerializer
    #permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        if 'course_id' in self.kwargs:
            course_id = self.kwargs['course_id']
            course = models.Course.objects.get(pk = course_id )
            return models.StudentCourseEnrollment.objects.filter(course=course)
        elif 'teacher_id' in self.kwargs:
            teacher_id = self.kwargs['teacher_id']
            teacher = models.Teacher.objects.get(pk = teacher_id )
            return models.StudentCourseEnrollment.objects.filter(course__teacher=teacher).distinct()
        elif 'student_id' in self.kwargs:
            student_id = self.kwargs['student_id']
            student = models.Student.objects.get(pk = student_id )
            return models.StudentCourseEnrollment.objects.filter(student=student).distinct()
        
#Rating and review
class CourseRatingList(generics.ListCreateAPIView):
    serializer_class = CourseRatingSerializer
    #permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        course_id = self.kwargs['course_id']
        course = models.Course.objects.get(pk = course_id )
        return models.CourseRating.objects.filter(course=course)
    
def fetch_rating_status(request,student_id,course_id):
    student = models.Student.objects.filter(id=student_id).first()
    course = models.Course.objects.filter(id=course_id).first()
    ratingStatus = models.CourseRating.objects.filter(course=course,student=student).count()
    if ratingStatus:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})
    
#teacher PAssword Reset
@csrf_exempt
def teacher_reset_password(request,teacher_id):
    password = request.POST['password']
    try:
        teacherData = models.Teacher.objects.get(id=teacher_id) 
    except:
        teacherData = None
    
    if teacherData is not None:
        models.Teacher.objects.filter(id=teacher_id).update(password=password)
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})
    
@csrf_exempt
def student_reset_password(request,student_id):
    password = request.POST['password']
    try:
        studentData = models.Student.objects.get(id=student_id) 
    except:
        studentData = None
        
    if studentData is not None:
        models.Student.objects.filter(id=student_id).update(password=password)
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})
    
    
class StudentAssignmentList(generics.ListCreateAPIView):
    queryset = models.StudentAssignment.objects.all()
    serializer_class = StudentAssignmentSerializer
    #permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        student_id = self.kwargs['student_id']
        teacher_id = self.kwargs['teacher_id']
        student = models.Student.objects.get(pk = student_id )
        teacher = models.Teacher.objects.get(pk = teacher_id )
        return models.StudentAssignment.objects.filter(teacher=teacher, student=student)
    
class MyAssignmentList(generics.ListCreateAPIView):
    queryset = models.StudentAssignment.objects.all()
    serializer_class = StudentAssignmentSerializer
    #permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        student_id = self.kwargs['student_id']
        student = models.Student.objects.get(pk = student_id )
        models.Notification.objects.filter(student=student,notif_for='student',notif_subject='assignment').update(notif_read_status=True)
        return models.StudentAssignment.objects.filter(student=student)
        
class UpdateAssignmentList(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.StudentAssignment.objects.all()
    serializer_class = StudentAssignmentSerializer
    
class NotificationList(generics.ListCreateAPIView):
    queryset = models.Notification.objects.all()
    serializer_class = NotificationSerializer
    
    def get_queryset(self):
            student_id = self.kwargs['student_id']
            student = models.Student.objects.get(pk = student_id )
            return models.Notification.objects.filter(student=student,notif_for='student',notif_subject='assignment',notif_read_status=False)
        
class QuizList(generics.ListCreateAPIView):
    queryset = models.Quiz.objects.all()
    serializer_class = QuizSerializer
    
class TeacherQuizList(generics.ListCreateAPIView):
    serializer_class = QuizSerializer
    #permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        teacher_id = self.kwargs['teacher_id']
        teacher = models.Teacher.objects.get(pk = teacher_id )
        return models.Quiz.objects.filter(teacher=teacher)
    
class TeacherQuizDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Quiz.objects.all()
    serializer_class = QuizSerializer
    
class QuizDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Quiz.objects.all()
    serializer_class = QuizSerializer
    #permission_classes = [permissions.IsAuthenticated]
    
class QuestionList(generics.ListCreateAPIView):   
    queryset = models.QuizQuestions.objects.all()
    serializer_class = QuizQuestionSerializer
    #permission_classes = [permissions.IsAuthenticated]
    
class QuizQuestionsList(generics.ListAPIView):
    serializer_class = QuizQuestionSerializer
    #permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        quiz_id = self.kwargs['quiz_id']
        quiz = models.Quiz.objects.get(pk = quiz_id )
        if 'limit' in self.kwargs:
            return models.QuizQuestions.objects.filter(quiz=quiz).order_by('id')[:1]
        elif 'question_id' in self.kwargs:
            current_question = self.kwargs['question_id']
            return models.QuizQuestions.objects.filter(quiz=quiz,id__gt=current_question).order_by('id')[:1]
        else:
            return models.QuizQuestions.objects.filter(quiz=quiz)
    
class QuizAssignList(generics.ListCreateAPIView):
    queryset = models.CourseQuiz.objects.all()
    serializer_class = CourseQuizSerializer
    #permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        if 'course_id' in self.kwargs:
            course_id = self.kwargs['course_id']
            course = models.Course.objects.get(pk = course_id )
            return models.CourseQuiz.objects.filter(course=course)
    
    

def fetch_quiz_assign_status(request,quiz_id,course_id):
    quiz = models.Quiz.objects.filter(id=quiz_id).first()
    course = models.Course.objects.filter(id=course_id).first()
    assignStatus  = models.CourseQuiz.objects.filter(course=course,quiz=quiz).count()
    if assignStatus:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})
    
def fetch_quiz_attemp_status(request,quiz_id,student_id):
    quiz = models.Quiz.objects.filter(id=quiz_id).first()
    student = models.Student.objects.filter(id=student_id).first()
    attemptedStatus  = models.AttemptedQuiz.objects.filter(student=student,question__quiz=quiz).count()
    if attemptedStatus:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})
    
class AttempQuizList(generics.ListCreateAPIView):
    queryset = models.AttemptedQuiz.objects.all()
    serializer_class = AttemptedQuizSerializer
    def get_queryset(self):
        if 'quiz_id' in self.kwargs:
            quiz_id = self.kwargs['quiz_id']
            quiz = models.Quiz.objects.get(pk = quiz_id )
            return models.AttemptedQuiz.objects.filter(quiz=quiz)