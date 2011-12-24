from django.conf.urls.defaults import patterns, url

urlpatterns = patterns('views',
    url(r'^setlang$', 'setlang'),
    url(r'.*', 'default')
)
