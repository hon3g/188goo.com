from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from app.models import Post, State, City
from .serializers import PostSerializer


class PostList(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = {DjangoFilterBackend}
    filterset_fields = {'id', 'category', 'slug'}

    def get_queryset(self):
        current_state = self.request.query_params.get('state')
        current_city = self.request.query_params.get('city')

        # Filter by state name
        if current_state is not None:
            # Empty argument
            if current_state == '':
                pass
            # Argument matches a state
            elif len(State.objects.filter(name=current_state)) == 1:
                state_id = State.objects.get(name=current_state).id
                city_ids = City.objects.filter(state=state_id).values_list('id', flat=True)
                return Post.objects.filter(city__in=city_ids)
            # Not empty but doesn't match a state
            else:
                return Post.objects.filter(city=-1)

        # Filter by city name
        if current_city is not None:
            # Empty argument
            if current_city == '':
                pass
            # Argument matches a city
            elif len(City.objects.filter(name=current_city)) == 1:
                city_id = City.objects.get(name=current_city).id
                return Post.objects.filter(city=city_id)
            # Not empty but doesn't match a city
            else:
                return Post.objects.filter(city=-1)

        # If not passed in, return default
        return super().get_queryset()
