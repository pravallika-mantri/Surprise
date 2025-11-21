from django.urls import path
from . import views

urlpatterns = [
    path('', views.confetti, name='confetti'),
    path('minigame/', views.game, name='minigame'),
    path('index/', views.index, name='index'),
    path('home/', views.home, name='home'),
    path('secret/', views.secret, name='secret'),
    path('story/', views.story, name='story'),
    path('message/', views.message, name='message'),
    path('gift/', views.gift, name='gift'),
    path('poem/', views.poem, name='poem'),
    path('scratch/', views.scratch, name='scratch'),
    path('spin/', views.spin, name='spin'),
    path('treasure/', views.treasure, name='treasure'),
    path('wish/', views.wish, name='wish'),
    path('letter/', views.letter, name='letter'),
    path('cake3d/', views.cake3d, name='cake3d'),
    path('love/', views.love, name='love'),
]
