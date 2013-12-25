__author__ = 'Afshin'

from django.shortcuts import render

def add_product(request):
    return render(request, 'vendor_base.html', '')

def edit_product(request):
    return render(request, 'vendor_base.html', '')
