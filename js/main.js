(function(){
    var crs = L.CRS.proj4js('EPSG:32633', '+proj=utm +zone=33+ellps=WGS84 +datum=WGS84 +units=m +no_defs', new L.Transformation(1, 2500000, -1, 9045984));
    crs.scale = function(zoom) {
        return 1 / (21674.7100160867  / Math.pow(2, zoom));
    };

    var popupTemplate = Handlebars.compile('<h3>{{name}}</h3><p>{{text}}</p>');
    var hoverTemplate =  Handlebars.compile('<span class="hover-title">{{name}}</span>');

    var map = L.map('map', { crs: crs, continuousWorld: true }).setView([59.9127300, 10.7460900], 7);

    var mapLayer = new L.TileLayer.WMS("http://nvdbcache.geodataonline.no/arcgis/services/Trafikkportalen/GeocacheTrafikkJPG/MapServer/WMSServer", {
        layers: '0',
        format: 'image/png',
        transparent: false,
        attribution: "Bakgrunnskart fra NVDB",
        minZoom: 3,
        maxZoom: 12
    }).addTo(map);

    var marker = L.marker([59.9127300, 10.7460900], {id: 123}).addTo(map);
    marker.bindPopup(hoverTemplate({name: 'E18 Hjortnes'}));
    marker.on('mouseover', function(e){e.target.openPopup()});
    marker.on('click', function(e) {
        var popup = e.target.getPopup();
        e.target.bindPopup(popupTemplate({name: 'E18 Hjortnes', text: 'lorem ipsum'}));
        e.target.openPopup();
        e.target.bindPopup(popup);
    });

    marker.on('mouseout', function(e) { e.target.closePopup();} );

    var coordinates = [L.latLng(59.9103985213679, 10.709005585692513), L.latLng(59.92009479120822,10.679954728293124)];
    var polyline = L.polyline(coordinates, {color: 'red'}).addTo(map);
    polyline.bindPopup(popupTemplate({name: 'EV18: Sjølystlokket - Hjortnes', text: 'lorem ipsum'}));
    polyline.on('mouseover', function(e) {e.target.openPopup()});

})();