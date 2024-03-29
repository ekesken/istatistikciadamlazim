from django.shortcuts import render_to_response
from django.template import RequestContext

def default(request):
    path = request.path[1:] or 'index.html'
    return render_to_response(path, {"user": request.user})

def setlang(request):
    return render_to_response('setlang.html', {}, context_instance=RequestContext(request))
