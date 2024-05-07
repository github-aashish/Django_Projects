from django.shortcuts import render
from rest_framework.views import APIView
from django.http import JsonResponse,HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import permissions
from .serializers import TeacherSerializer, CategorySerializer, CourseSerializer, ModulesSerializer
from . import models


# Create your views here.
class TeacherList(generics.ListCreateAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherSerializer
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
    

class CategoryList(generics.ListCreateAPIView):
    queryset = models.CourseCategory.objects.all()
    serializer_class = CategorySerializer
    #permission_classes = [permissions.IsAuthenticated]
    
class CourseList(generics.ListCreateAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseSerializer
    #permission_classes = [permissions.IsAuthenticated]
    
class TeacherCourseList(generics.ListAPIView):
    serializer_class = CourseSerializer
    #permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        teacher_id = self.kwargs['teacher_id']
        teacher = models.Teacher.objects.get(pk = teacher_id )
        return models.Course.objects.filter(teacher=teacher)
    
#class ModulesList(generics.ListCreateAPIView):   
#    queryset = models.Modules.objects.all()
#    serializer_class = ModulesSerializer
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