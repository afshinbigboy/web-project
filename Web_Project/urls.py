
from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'Web_Project.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^$', 'management.views.home', name='home'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^vendor/', include('vendor.urls')),
    url(r'^product/', include('product.urls')),
    # url(r'^search/', include('search.urls'),),

)
