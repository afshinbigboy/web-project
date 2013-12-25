__author__ = 'Afshin'

from django.shortcuts import render

def home(request):
    return render(request, 'home.html', '')
