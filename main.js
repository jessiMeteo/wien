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
    "BasemapAT grau": L.tileLayer('https://mapsneu.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png', {
        maxZoom: 19,
        attribution: 'Hintergrundkarte: <a href="https://www.basemap.at">basemap.at</a>'
    }).addTo(map)
}, {
    "Sehenswürdigkeiten": L.featureGroup().addTo(map),
    "Vienna sightseeing Linien": L.featureGroup().addTo(map),
    "Vienna sightseeing Haltestellen": L.featureGroup().addTo(map),
    "Fußgängerzonen": L.featureGroup().addTo(map),
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
    }).addTo(map);
}

// Liniennetz Standorte Wien
async function loadLines(url) {
    //console.log(url);
    let response = await fetch(url); //wartet bis Server antwortet auf URL
    let jsondata = await response.json(); // wartet nimmt daten und ladet sie herunter
    //console.log(jsondata);
    L.geoJSON(jsondata, {
        attribution: "Datenquelle: <a href = 'https://data.wien.gv.at'> Stadt Wien </a>"
    }).addTo(map);
}

// Linenhaltestelle Standorte Wien
async function loadStops(url) {
    //console.log(url);
    let response = await fetch(url); //wartet bis Server antwortet auf URL
    let jsondata = await response.json(); // wartet nimmt daten und ladet sie herunter
    //console.log(jsondata);
    L.geoJSON(jsondata, {
        attribution: "Datenquelle: <a href = 'https://data.wien.gv.at'> Stadt Wien </a>"
    }).addTo(map);
}

// Füßgängerzone Standorte Wien
async function loadZones(url) {
    //console.log(url);
    let response = await fetch(url); //wartet bis Server antwortet auf URL
    let jsondata = await response.json(); // wartet nimmt daten und ladet sie herunter
    //console.log(jsondata);
    L.geoJSON(jsondata, {
        attribution: "Datenquelle: <a href = 'https://data.wien.gv.at'> Stadt Wien </a>"
    }).addTo(map);
}

// GeoJSON laden und visualisieren
loadSights('https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:SEHENSWUERDIGOGD&srsName=EPSG:4326&outputFormat=json');
loadLines('https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:TOURISTIKLINIEVSLOGD&srsName=EPSG:4326&outputFormat=json');
loadStops('https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:TOURISTIKHTSVSLOGD&srsName=EPSG:4326&outputFormat=json');
loadZones('https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:FUSSGEHERZONEOGD&srsName=EPSG:4326&outputFormat=json');