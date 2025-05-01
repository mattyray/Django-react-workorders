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
    # Remove read_only so we can accept writes
    events = EventSerializer(many=True)
    attachments = JobAttachmentSerializer(many=True, read_only=True)
    notes = JobNoteSerializer(many=True, read_only=True)

    class Meta:
        model = WorkOrder
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at']

    def create(self, validated_data):
        events_data = validated_data.pop('events', [])
        workorder = WorkOrder.objects.create(**validated_data)
        for event_data in events_data:
            Event.objects.create(work_order=workorder, **event_data)
        return workorder

    def update(self, instance, validated_data):
        # Pull off any nested events (if provided)
        events_data = validated_data.pop('events', None)

        # Update the WorkOrder itself
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if events_data is not None:
            # Simple strategy: delete all old events and recreate
            instance.events.all().delete()
            for event_data in events_data:
                Event.objects.create(work_order=instance, **event_data)

        return instance