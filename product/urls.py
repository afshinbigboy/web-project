__author__ = 'Afshin bb'

from django.conf.urls import patterns,include, url

urlpatterns = patterns('product.views',
    url(r'^list/', 'product_list', name='product_list'),
    url(r'^item/', 'product_details', name='product_details'),
)
