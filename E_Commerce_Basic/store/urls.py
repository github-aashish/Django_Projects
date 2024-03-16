from django.contrib import admin
from django.urls import path
#from .views import home, login, signup
#from .views.home import index
from .views.signup import Signup
from . views.login import Login, Logout
from . views.home import Index
from . views.cart import Cart
from . views.checkout import Checkout
from . views.orders import OrderView
from . middlewares.auth import auth_middleware

urlpatterns = [
    #path('',home.index,name='homepage'),
    #path('signup',signup.Signup.as_view(), name='signup'),
    #path('login', login.Login.as_view(), name='login'),
    path('',Index.as_view(),name='homepage'),
    path('signup',Signup.as_view(), name='signup'),
    path('login', Login.as_view(), name='login'),
    path('logout', Logout, name='logout'),
    path('cart', Cart.as_view(), name='cart'),
    path('check-out', Checkout.as_view(), name='check-out'),
    #path('orders',OrderView.as_view(), name='orders')
    path('orders',auth_middleware(OrderView.as_view()), name='orders')
]