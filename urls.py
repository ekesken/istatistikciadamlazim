from django.conf.urls.defaults import patterns, url, include

urlpatterns = patterns('views',
    url(r'^accounts/', include('allauth.urls')),
    url(r'^setlang$', 'setlang'),
    url(r'.*', 'default')
)
