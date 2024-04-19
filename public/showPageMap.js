mapboxgl.accessToken = 'pk.eyJ1IjoibHVrZTkwODYiLCJhIjoiY2x2MjU0ZGJsMGNhZTJ0bGRoZW02ZzFxbyJ9.1iinot1VjCmGOZxfRaXjrg';
const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: campground.geometry.coordinates, // starting position [lng, lat]
        zoom: 9, // starting zoom
});
// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());
const marker = new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${campground.title}</h3><p>${campground.location}</p>`
            )
    )
    .addTo(map);
