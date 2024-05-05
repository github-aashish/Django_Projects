from django.urls import path
from . import views

urlpatterns = [
    #Teacher
    path('teacher/',views.TeacherList.as_view()),
    path('teacher/<int:pk>/',views.TeacherDetail.as_view()),
    path('teacher-login',views.teacher_login),
    #Category
    path('category/',views.CategoryList.as_view()),
    #Course
    path('course/',views.CourseList.as_view()),
    #Specific Course Videos
    path('course-modules/<int:course_id>',views.CourseModuleList.as_view()),
    #Videos
    path('modules/',views.ModulesList.as_view()),
    #Teacher Course
    path('teacher-course/<int:teacher_id>',views.TeacherCourseList.as_view()),
    
]
