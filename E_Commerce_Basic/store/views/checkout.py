from django.shortcuts import render, redirect
# from django.http import HttpResponse
from django.contrib.auth.hashers import make_password, check_password
# from store.models.product import Product
# from store.models.category import Category
from store.models.customer import Customer
from django.views import View
from store.models.product import Product
from store.models.orders import Orders


class Checkout(View):
    def post(self, request):
        # print(request.POST)
        address = request.POST.get('address')
        phone = request.POST.get('phone')
        customer = request.session.get('customer_id')
        cart = request.session.get('cart')
        products = Product.get_product_by_id(list(cart.keys()))

        for product in products:
            order = Orders(customer=Customer(id=customer), product=product, price=product.price,
                           quantity=cart.get(str(product.id)), address=address, phone=phone)
            Orders.placeOrder(order)
            #order.placeOrder()   2nd option

        request.session['cart'] = {}
        # print(address, phone, customer, products)
        return redirect('cart')
