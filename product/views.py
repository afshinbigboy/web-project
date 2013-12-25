__author__ = 'Afshin'

from django.shortcuts import render


def product_list(request):
    products = list(range(12))
    context = {
        'products': products,
        'cat': 'film',
        'sub_cat': 'jj',
    }
    return render(request, 'product_list.html', context)


def product_details(request):
    return render(request, 'product_details.html', '')
