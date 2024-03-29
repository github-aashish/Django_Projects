from django.shortcuts import render, redirect
# from django.http import HttpResponse
from django.contrib.auth.hashers import make_password, check_password
# from store.models.product import Product
# from store.models.category import Category
from store.models.customer import Customer
from django.views import View
from store.models.product import Product
from store.models.orders import Orders
#from store.middlewares.auth import auth_middleware
#from django.utils.decorators import method_decorator

class OrderView(View):
    #@method_decorator(auth_middleware)
    def get(self, request):
        customer = request.session.get('customer_id')
        orders = Orders.get_orders_by_customer(customer)
        #print(orders)
        return render(request, 'orders.html', {'orders' : orders})
