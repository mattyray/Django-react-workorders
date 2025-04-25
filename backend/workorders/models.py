from django.db import models
from django.conf import settings

class WorkOrder(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
    ]
    client_name = models.CharField(max_length=255, blank=True)  # Changed from FK to charfield
    job_description = models.TextField(blank=True, null=True)
    estimated_cost = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        blank=True,
        null=True
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    completed_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"WorkOrder #{self.id} for {self.client_name}"

    def update_status(self):
        if self.status == 'completed':
            return
        if self.events.filter(date__isnull=False).exists():
            self.status = 'in_progress'
        else:
            self.status = 'pending'
        # Optional:
        # self.save()
