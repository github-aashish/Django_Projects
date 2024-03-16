from django.shortcuts import render, redirect
#from django.http import HttpResponse
from django.contrib.auth.hashers import make_password, check_password
#from store.models.product import Product
#from store.models.category import Category
from store.models.customer import Customer
from django.views import View

class Signup(View):
    def get(self, request):
        return render(request, 'signup.html')
    def post(self,request):
        postData = request.POST
        first_name = postData.get('firstname')
        last_name = postData.get('lastname')
        phone = postData.get('phone')
        email = postData.get('email')
        password = postData.get('password')
        # validation
        value = {
            'first_name': first_name,
            'last_name': last_name,
            'phone': phone,
            'email': email
        }
        customer = Customer(first_name=first_name,
                            last_name=last_name,
                            phone=phone,
                            email=email,
                            password=password)

        error_message = self.validateCustomer(customer)

        # saving
        if not error_message:
            customer.password = make_password(customer.password)
            customer.register()
            return redirect('homepage')
        else:
            data = {
                'error': error_message,
                'values': value
            }
            return render(request, 'signup.html', data)
        # return HttpResponse(request.POST.get('email'))
        # return HttpResponse("SignUp success")

    def validateCustomer(self, customer):
        error_message = None
        if not customer.first_name:
            error_message = "First Name Required!"
        elif len(customer.first_name) < 3:
            error_message = "First Name must be 3 char Long or more !"
        elif not customer.last_name:
            error_message = "Last Name Required!"
        elif len(customer.last_name) < 3:
            error_message = "Last Name must be 3 char Long !"
        elif not customer.phone:
            error_message = "Phone Number Required!"
        elif len(customer.phone) < 10:
            error_message = "Phone Number must be 10 char Long !"
        elif not customer.password:
            error_message = "Password Required!"
        elif len(customer.password) < 6:
            error_message = "Password must be 6 char Long !"
        elif len(customer.email) < 5:
            error_message = "Email must be 5 char long !"
        elif customer.isExists():
            error_message = "User with this Email is already Registered"

        return error_message