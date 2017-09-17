import json

from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase
from schema import Schema, And


# noinspection PyPep8Naming
class SchemaAssertion:
    @staticmethod
    def assertSchema(data, schema):
        try:
            schema.validate(json.loads(json.dumps(data)))
        except Exception:
            raise AssertionError('Error schema validation for: {data}'.format(data=str(data)))


class LoadCircleTests(APITestCase, SchemaAssertion):
    def test_get_circle_method___returns_bad_request___when_scene_size_not_passed(self):
        response = self.client.get(reverse('circle'))
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_circle_method___returns_circle___when_scene_size_is_passed(self):
        request = {'width': 100, 'height': 100}
        response = self.client.get(reverse('circle'), request)

        response_schema = Schema({
            'point': {
                'x': And(int, lambda n: 0 <= n <= 100),
                'y': And(int, lambda n: 0 <= n <= 100)
            },
            'radius': And(int, lambda n: 0 <= n <= 100 // 2)
        })

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertSchema(response.data, response_schema)


class CheckInsideTests(APITestCase):
    def test_check_inside_method__returns_bad_request__when_point_not_passed(self):
        response = self.client.post(reverse('circle'))
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_check_inside_method__returns_bad_request__when_circle_not_passed(self):
        request = {
            'point': {
                'x': 100,
                'y': 200
            }
        }
        response = self.client.post(reverse('circle'), request, 'json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_check_inside_method__returns_inside_true__when_point_inside_circle(self):
        request = {
            'point': {
                'x': 100,
                'y': 200
            },
            'circle': {
                'point': {
                    'x': 100,
                    'y': 200
                },
                'radius': 50
            }
        }

        response = self.client.post(reverse('circle'), request, 'json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['inside'])

    def test_check_inside_method__returns_inside_false__when_point_not_inside_circle(self):
        request = {
            'point': {
                'x': 160,
                'y': 200
            },
            'circle': {
                'point': {
                    'x': 100,
                    'y': 200
                },
                'radius': 50
            }
        }

        response = self.client.post(reverse('circle'), request, 'json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(response.data['inside'])
