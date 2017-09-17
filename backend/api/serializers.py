from rest_framework import serializers


class PointSerializer(serializers.Serializer):
    x = serializers.IntegerField(min_value=0)
    y = serializers.IntegerField(min_value=0)


class CircleSerializer(serializers.Serializer):
    point = PointSerializer(required=True)
    radius = serializers.IntegerField(min_value=0)


class SceneSerializer(serializers.Serializer):
    width = serializers.IntegerField(min_value=0)
    height = serializers.IntegerField(min_value=0)


class InsideSceneRequestSerializer(serializers.Serializer):
    circle = CircleSerializer(required=True)
    point = PointSerializer()


class InsideSceneResponseSerializer(serializers.Serializer):
    inside = serializers.BooleanField()
