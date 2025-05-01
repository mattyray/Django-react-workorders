from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse

def api_root(request):
    return JsonResponse({"message": "Django API is running."})

urlpatterns = [
    path("", api_root),  # ✅ Added simple health check route
    path("admin/", admin.site.urls),
    path("api/workorders/", include("workorders.urls")),  # Your main API
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
