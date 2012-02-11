from django.conf.urls.defaults import patterns, url, include

urlpatterns = patterns('views',
    # url(r'^accounts/profile/$', 'redirect_to', {'url': '/'}),
    url(r'^accounts/', include('allauth.urls')),
    url(r'^setlang$', 'setlang'),
    url(r'.*', 'default')
)
