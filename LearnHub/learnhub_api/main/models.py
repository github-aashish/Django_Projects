from django.db import models
from django.core import serializers


# Create your models here.
#Teacher Model
class Teacher(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    mobile = models.BigIntegerField()
    password = models.CharField(max_length=100,blank=True,null=True)
    qualification = models.CharField(max_length=200)
    skills = models.TextField()
    detail = models.TextField(null=True)
    profile_image = models.ImageField(upload_to='teachers_images', null=True)
    
    class Meta:
        verbose_name_plural = "Teachers"
        
    def __str__(self):
        return self.full_name
    
    def skill_list(self):
        skill_list = self.skills.split(',')
        return skill_list
    
    def total_teacher_courses(self):
        total_courses = Course.objects.filter(teacher=self).count()
        return total_courses
    
    def total_teacher_modules(self):
        total_modules = Modules.objects.filter(course__teacher=self).count()
        return total_modules
    
    def total_teacher_students(self):
        total_students = StudentCourseEnrollment.objects.filter(course__teacher=self).count()
        return total_students
    
#Student Model
class Student(models.Model):
    full_name = models.CharField(max_length=100)
    username = models.CharField(max_length=200)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=100,null=True)
    interested_categories = models.TextField()
    profile_image = models.ImageField(upload_to='student_images', null=True)
    
    
    class Meta:
        verbose_name_plural = "Students"
        
    def __str__(self):
        return self.full_name
    
    def total_enroll(self):
        total_enroll = StudentCourseEnrollment.objects.filter(student=self).count()
        return total_enroll
    
    def total_favourite(self):
        total_favourite = StudentFavouriteCourse.objects.filter(student=self).count()
        return total_favourite
    
    def total_completed(self):
        total_completed = StudentAssignment.objects.filter(student=self,student_status=True).count()
        return total_completed
    
    def total_pending(self):
        total_pending = StudentAssignment.objects.filter(student=self,student_status=False).count()
        return total_pending
    
    
#Course Categories
class CourseCategory(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField()
    
    class Meta:
        verbose_name_plural = "Categories"
        
    def __str__(self):
        return self.title
    
#Course Model
class Course(models.Model):
    category = models.ForeignKey(CourseCategory, on_delete = models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete = models.CASCADE,related_name='teacher_courses')
    title = models.CharField(max_length=150)
    description = models.TextField()
    featured_image = models.ImageField(upload_to='courses_images/', null=True)
    technologies = models.TextField(null=True)
    
    class Meta:
        verbose_name_plural = "Courses"
    def __str__(self):
        return self.title
    
    def related_videos(self):
        related_videos = Course.objects.filter(technologies__icontains=self.technologies)
        return serializers.serialize('json', related_videos)
    
    def technologies_list(self):
        technologies_list = self.technologies.split(',')
        return technologies_list
    
    def total_enrolled_students(self):
        total_enrolled_students = StudentCourseEnrollment.objects.filter(course=self).count()
        return total_enrolled_students
    def course_rating(self):
        course_rating = CourseRating.objects.filter(course=self).aggregate(avg_rating=models.Avg('rating'))
        return course_rating['avg_rating']
        
#Favourite Courses
class StudentFavouriteCourse(models.Model):
    course = models.ForeignKey(Course,on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    status = models.BooleanField(default=False)
    
    class Meta:
        verbose_name_plural = "Student Favourite Courses"
        
    def __str__(self):
        return f"{self.course}-{self.student}"
        
#Videos
class Modules(models.Model):
    course = models.ForeignKey(Course, on_delete = models.CASCADE,related_name='course_modules')
    title = models.CharField(max_length=150)
    description = models.TextField()
    video = models.FileField(upload_to='module_videos/', null=True)
    remarks = models.TextField(null=True)
    
    class Meta:
        verbose_name_plural = "Videos"
        
    def __str__(self):
        return self.title
        
class StudentCourseEnrollment(models.Model):
    course = models.ForeignKey(Course, on_delete = models.CASCADE, related_name='enrolled_courses')
    student = models.ForeignKey(Student, on_delete = models.CASCADE, related_name='enrolled_student')
    enroll_time = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = "Enrollments"
    def __str__(self):
        return f"{self.course}" +" "+" "+"  |  "+ f"{self.student}"


#Course Review and Rating
class CourseRating(models.Model):
    course = models.ForeignKey(Course, on_delete = models.CASCADE)
    student = models.ForeignKey(Student, on_delete = models.CASCADE)
    rating = models.PositiveBigIntegerField(default=0)
    review = models.TextField(null=True)
    review_time = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = "Ratings"
    def __str__(self):
        return f"{self.course}" +" "+" "+"  |  "+ f"{self.student}" +" "+" "+"  |  "+ f"{self.rating}"
    
    
#Assignments
class StudentAssignment(models.Model):
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete = models.CASCADE)
    title = models.CharField(max_length=200)
    detail = models.TextField(null=True)
    add_time = models.DateTimeField(auto_now_add=True)
    student_status = models.BooleanField(default=False,null=True)
    
    class Meta:
        verbose_name_plural = "Assignments"
        
    def __str__(self):
        return f"{self.student}" +" "+" "+"  |  "+ f"{self.title}" +" "+" "+"  |  "+ f"{self.add_time}"
    


#Notifications    
class Notification(models.Model):
    teacher = models.ForeignKey(Teacher,on_delete=models.CASCADE,null=True)
    student = models.ForeignKey(Student,on_delete=models.CASCADE,null=True)
    notif_subject = models.CharField(max_length=200,verbose_name="Notification Subject",null=True)
    notif_for = models.CharField(max_length=200,verbose_name="Notification For",null=True)
    notif_created_time = models.DateTimeField(auto_now_add=True)
    notif_read_status = models.BooleanField(default=False,verbose_name="Notification Read Status")
    
    class Meta:
        verbose_name_plural = "Notifications"
        
# Quiz Models
class Quiz(models.Model):
    teacher = models.ForeignKey(Teacher,on_delete=models.CASCADE,null=True)
    title = models.CharField(max_length=100)
    detail = models.TextField()
    add_time = models.DateTimeField(auto_now_add=True)
    
    def assign_status(self):
        return CourseQuiz.objects.filter(quiz=self).count()
    
    class Meta:
        verbose_name_plural = "Quiz"
    def __str__(self):
        return self.title
        
        
class QuizQuestions(models.Model):
    quiz = models.ForeignKey(Quiz,on_delete=models.CASCADE,null=True)
    question = models.CharField(max_length=200)
    ans1 = models.CharField(max_length=200)
    ans2 = models.CharField(max_length=200)
    ans3 = models.CharField(max_length=200)
    ans4 = models.CharField(max_length=200)
    right_ans = models.CharField(max_length=200)
    add_time = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = ("QuizQuestions")
        
#Add Quiz To Course
class CourseQuiz(models.Model):
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE,null=True)
    course = models.ForeignKey(Course,on_delete=models.CASCADE,null=True)
    quiz = models.ForeignKey(Quiz,on_delete=models.CASCADE,null=True)
    add_time = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = "Courses Quiz"
        
#Quiz Attempted By students

class AttemptedQuiz(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE,null=True)
    question = models.ForeignKey(QuizQuestions,on_delete=models.CASCADE,null=True)
    submitted_answer = models.CharField(max_length=200,null=True)
    add_time = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = "Attempted Quiz"

    