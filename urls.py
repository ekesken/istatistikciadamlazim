from django.conf.urls.defaults import patterns, url, include
from django.views.generic.simple import redirect_to

urlpatterns = patterns('views',
    url(r'^accounts/profile/$', redirect_to, {'url': '/'}),
    url(r'^accounts/', include('allauth.urls')),
    url(r'^setlang$', 'setlang'),
    url(r'.*', 'default')
)
