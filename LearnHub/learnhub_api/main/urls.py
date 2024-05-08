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
    #Course Detail
    path('course/<int:pk>',views.CourseDetailList.as_view()),
    #Specific Course Videos
    path('course-modules/<int:course_id>',views.CourseModuleList.as_view()),
    #Videos
    path('module/',views.ModulesList.as_view()),
    #specific Video
    path('modules/<int:pk>',views.ModuleDetailView.as_view()),
    #Teacher Course
    path('teacher-course/<int:teacher_id>',views.TeacherCourseList.as_view()),
    #Specific Course
    path('teacher-course-detail/<int:pk>',views.TeacherCourseDetail.as_view()),
    #Student 
    path('student/',views.StudentList.as_view()),
    path('student-login',views.student_login),
    
    
    
    
    
]
