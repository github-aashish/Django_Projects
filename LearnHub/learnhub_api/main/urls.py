from django.urls import path
from . import views

urlpatterns = [
    #Teacher
    path('teacher/',views.TeacherList.as_view()),
    path('teacher/dashboard/<int:pk>/',views.TeacherDashboard.as_view()),
    path('teacher/<int:pk>/',views.TeacherDetail.as_view()),
    path('teacher/change-password/<int:teacher_id>/',views.teacher_reset_password),
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
    path('student/<int:pk>/',views.StudentDetail.as_view()),
    path('student/dashboard/<int:pk>/',views.StudentDashboard.as_view()),
    path('student-login',views.student_login),
    path('student/change-password/<int:student_id>/',views.student_reset_password),
    
    #Enrollment
    path('student-enroll-course/',views.EnrollCourseList.as_view()),
    #fetch Enroll
    path('fetch-enroll-status/<int:student_id>/<int:course_id>',views.fetch_enroll_status),
    path('fetch-all-enroll-students/<int:teacher_id>',views.EnrolledStudentsList.as_view()),
    path('fetch-enroll-students/<int:course_id>',views.EnrolledStudentsList.as_view()),
    path('fetch-enroll-courses/<int:student_id>',views.EnrolledStudentsList.as_view()),
    path('fetch-recommended-courses/<int:studentId>',views.CourseList.as_view()),
    #Favourite Courses
    path('student-add-favourite-course/',views.StudentFavouriteCourseList.as_view()),
    path('fetch-favourite-status/<int:student_id>/<int:course_id>',views.fetch_favourite_status),
    path('student-remove-favourite-course/<int:course_id>/<int:student_id>',views.remove_favourite_course),
    path('fetch-favourite-courses/<int:student_id>',views.StudentFavouriteCourseList.as_view()),
    
    #Rating
    path('course-rating/<int:course_id>',views.CourseRatingList.as_view()),
    path('fetch-rating-status/<int:student_id>/<int:course_id>',views.fetch_rating_status),
    #Assignment
    path('student-assignment/<int:teacher_id>/<int:student_id>',views.StudentAssignmentList.as_view()),
    path('my-assignment/<int:student_id>',views.MyAssignmentList.as_view()),
    path('update-assignment/<int:pk>',views.UpdateAssignmentList.as_view()),  
    #Notifications
    path('student/fetch-all-notifications/<int:student_id>',views.NotificationList.as_view()),  
    path('save-notification/',views.NotificationList.as_view()),  
    
    
]
