__author__ = 'Afshin'

from django.shortcuts import render

def add_product(request):
    return render(request, 'add_product.html', '')

def edit_product(request):
    return render(request, 'edit_product.html', '')
