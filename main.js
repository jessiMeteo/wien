/* Vienna Sightseeing Beispiel */

// Stephansdom Objekt
let stephansdom = {
    lat: 48.208493,
    lng: 16.373118,
    zoom: 12,
    title: "Domkirche St. Stephan",
};

// Karte initialisieren
let map = L.map("map").setView([stephansdom.lat, stephansdom.lng], stephansdom.zoom);

// Overlays definieren
let overlays = {
    sights: L.featureGroup().addTo(map),
    lines: L.featureGroup().addTo(map),
    stops: L.featureGroup().addTo(map),
    zones: L.featureGroup().addTo(map),
}

// Layercontrol
L.control.layers({
    // finde bei demo, alle Kartenvarianten
    "BasemapAT": L.tileLayer.provider('BasemapAT.basemap').addTo(map),
    "BasemapAT grau": L.tileLayer.provider('BasemapAT.grau').addTo(map),
    "BasemapAT HighDPI": L.tileLayer.provider('BasemapAT.highdpi').addTo(map),
    "BasemapAT Orthofoto": L.tileLayer.provider('BasemapAT.orthofoto').addTo(map),
    "BasemapAT Overlay": L.tileLayer.provider('BasemapAT.overlay').addTo(map),
    "BasemapAT Relief": L.tileLayer.provider('BasemapAT.terrain').addTo(map),
    "BasemapAT Oberfläche": L.tileLayer.provider('BasemapAT.surface').addTo(map)
}, {
    "Sehenswürdigkeiten": overlays.sights,
    "Vienna sightseeing Linien": overlays.lines,
    "Vienna sightseeing Haltestellen": overlays.stops,
    "Fußgängerzonen": overlays.zones,
}).addTo(map);

// Maßstab (Plug-in)
// options mit {} einfügen und default-values beachten
let scale = L.control.scale({
    imperial: false
}).addTo(map);

// Sehenswürdigkeiten Standorte Wien
async function loadSights(url) {
    //console.log(url);
    let response = await fetch(url); //wartet bis Server antwortet auf URL
    let jsondata = await response.json(); // wartet nimmt daten und ladet sie herunter
    //console.log(jsondata);
    L.geoJSON(jsondata, {
        attribution: "Datenquelle: <a href = 'https://data.wien.gv.at'> Stadt Wien </a>"
    }).addTo(overlays.sights);
}

// Liniennetz Standorte Wien
async function loadLines(url) {
    //console.log(url);
    let response = await fetch(url); //wartet bis Server antwortet auf URL
    let jsondata = await response.json(); // wartet nimmt daten und ladet sie herunter
    //console.log(jsondata);
    L.geoJSON(jsondata, {
        attribution: "Datenquelle: <a href = 'https://data.wien.gv.at'> Stadt Wien </a>"
    }).addTo(overlays.lines);
}

// Linenhaltestelle Standorte Wien
async function loadStops(url) {
    //console.log(url);
    let response = await fetch(url); //wartet bis Server antwortet auf URL
    let jsondata = await response.json(); // wartet nimmt daten und ladet sie herunter
    //console.log(jsondata);
    L.geoJSON(jsondata, {
        attribution: "Datenquelle: <a href = 'https://data.wien.gv.at'> Stadt Wien </a>"
    }).addTo(overlays.stops);
}

// Füßgängerzone Standorte Wien
async function loadZones(url) {
    //console.log(url);
    let response = await fetch(url); //wartet bis Server antwortet auf URL
    let jsondata = await response.json(); // wartet nimmt daten und ladet sie herunter
    //console.log(jsondata);
    L.geoJSON(jsondata, {
        attribution: "Datenquelle: <a href = 'https://data.wien.gv.at'> Stadt Wien </a>"
    }).addTo(overlays.zones);
}

// GeoJSON laden und visualisieren
loadSights('https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:SEHENSWUERDIGOGD&srsName=EPSG:4326&outputFormat=json');
loadLines('https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:TOURISTIKLINIEVSLOGD&srsName=EPSG:4326&outputFormat=json');
loadStops('https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:TOURISTIKHTSVSLOGD&srsName=EPSG:4326&outputFormat=json');
loadZones('https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:FUSSGEHERZONEOGD&srsName=EPSG:4326&outputFormat=json');