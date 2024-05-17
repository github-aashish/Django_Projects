from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Teacher)
admin.site.register(Student)
admin.site.register(CourseCategory)
admin.site.register(Course)
admin.site.register(Modules)
admin.site.register(StudentCourseEnrollment)
admin.site.register(CourseRating)
admin.site.register(StudentFavouriteCourse)
admin.site.register(StudentAssignment)

class NotificationAdmin(admin.ModelAdmin):
    list_display = ['id','notif_subject','notif_for','notif_read_status']
    
admin.site.register(Notification,NotificationAdmin)

admin.site.register(Quiz)
admin.site.register(QuizQuestions)
admin.site.register(CourseQuiz)
admin.site.register(AttemptedQuiz)





