var map, heatmap;
var mcgillYIntersection = { lat: 45.504696, lon: -73.576451 };

$.get('/wifi', function (data, status) {

    /*var wifiDataPoints = $.map(data, function (element) {
        var strength = 10 * 100 * Math.exp(element.level / 20);
        return { weight: strength, location: new google.maps.LatLng(element.lat, element.lon) };
    });*/

    var wifiDataPoints = $.map(data, function (element) {
        element.level = 10 * 100 * Math.exp(element.level / 20);
        return element;
    });

    var mapOptions = {
        zoom: 17,
        center: new google.maps.LatLng(mcgillYIntersection.lat, mcgillYIntersection.lon)
    };

    console.log(wifiDataPoints);
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    heatmap = new HeatmapOverlay(map,
        {
            radius: 40,
            dissapating: true,
            //useLocalExtrema: true,
            opacity: 0.5,
            //scaleRadius: true,
            latField: 'lat',
            lngField: 'lon',
            valueField: 'level'
        });

    heatmap.setData({ max: 100, data: wifiDataPoints });
});