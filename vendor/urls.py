__author__ = 'Afshin'

from django.conf.urls import patterns,include, url

urlpatterns = patterns('vendor.views',
    url(r'^add', 'add_product', name='add_product'),
    url(r'^edit', 'edit_product', name='edit_product'),
)
