# workorders/serializers.py

from rest_framework import serializers
from .models import WorkOrder, Event, JobAttachment, JobNote

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class JobAttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobAttachment
        fields = '__all__'

class JobNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobNote
        fields = '__all__'

class WorkOrderSerializer(serializers.ModelSerializer):
    events = EventSerializer(many=True, read_only=True)
    attachments = JobAttachmentSerializer(many=True, read_only=True)
    notes = JobNoteSerializer(many=True, read_only=True)

    class Meta:
        model = WorkOrder
        fields = '__all__'
