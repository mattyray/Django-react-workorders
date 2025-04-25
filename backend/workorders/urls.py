from django.urls import path
from .views import WorkOrderListCreateView, WorkOrderRetrieveUpdateDestroyView

urlpatterns = [
    path('', WorkOrderListCreateView.as_view(), name='workorder-list-create'),
    path('<int:pk>/', WorkOrderRetrieveUpdateDestroyView.as_view(), name='workorder-detail'),
]
