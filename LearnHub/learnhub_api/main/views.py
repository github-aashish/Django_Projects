from django.shortcuts import render
from rest_framework.views import APIView
from django.http import JsonResponse,HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import permissions
from .serializers import TeacherSerializer, CategorySerializer, CourseSerializer, ModulesSerializer,StudentSerializer
from . import models


# Create your views here.
class TeacherList(generics.ListCreateAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherSerializer
    #permission_classes = [permissions.IsAuthenticated]
    
class StudentList(generics.ListCreateAPIView):
    queryset = models.Student.objects.all()
    serializer_class = StudentSerializer
    #permission_classes = [permissions.IsAuthenticated]
    
    
class TeacherDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherSerializer
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
            
        if 'category' in self.request.GET:
            category = self.request.GET['category']
            qs = models.Course.objects.filter(technologies__icontains=category)
            
        if 'skill_name' in self.request.GET and 'teacher' in self.request.GET:
            skill_name = self.request.GET['skill_name']
            teacher = self.request.GET['teacher']
            teacher = models.Teacher.objects.filter(id=teacher).first()
            qs = models.Course.objects.filter(technologies__icontains=skill_name,teacher=teacher)
        return qs
    
    
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