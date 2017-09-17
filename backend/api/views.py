from random import randint

from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import SceneSerializer, CircleSerializer, PointSerializer, InsideSceneRequestSerializer, \
    InsideSceneResponseSerializer


class CircleView(APIView):
    def get(self, request):
        scene = SceneSerializer(data=request.query_params)
        scene.is_valid(raise_exception=True)

        width = scene.data['width']
        height = scene.data['height']

        return Response(
            data=CircleSerializer({
                'point': PointSerializer({
                    'x': randint(0, width),
                    'y': randint(0, height)
                }).data,
                'radius': randint(0, min(width, height) // 2)
            }).data
        )

    def post(self, request):
        request_serializer = InsideSceneRequestSerializer(data=request.data)
        request_serializer.is_valid(raise_exception=True)

        circle = request_serializer.data['circle']
        circle_x = circle['point']['x']
        circle_y = circle['point']['y']
        circle_radius = circle['radius']

        point = request_serializer.data['point']
        point_x = point['x']
        point_y = point['y']

        return Response(
            data=InsideSceneResponseSerializer({
                'inside': pow(point_x - circle_x, 2) + pow(point_y - circle_y, 2) < pow(circle_radius, 2)
            }).data
        )
