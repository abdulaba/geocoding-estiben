import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="map"
export default class extends Controller {
  static values = {
    markers: Array,
  };
  connect() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYWJkdWxhYmEiLCJhIjoiY2w4cHg2ZGVyMXR0azN2cDRiaGszemdiciJ9.GMr4gUtLVUQ-skCzx-ZCxA";
    // A GeoJSON object with a LineString route from the White House to Capitol Hill
    const geojson = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "LineString",
            properties: {},
            coordinates: [
            ],
          },
        },
      ],
    };

    this.markersValue.forEach((element) => {
      console.log(element.reverse())
       geojson.features[0].geometry.coordinates.push(element);
    });


    const map = new mapboxgl.Map({
      container: "map",
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: "mapbox://styles/mapbox/light-v10",
      center: [this.markersValue[0][1], this.markersValue[0][0]],
      zoom: 1,
    });


     map.on("load", () => {
      map.addSource("LineString", {
        type: "geojson",
        data: geojson,
      });

      map.addLayer({
        id: "LineString",
        type: "line",
        source: "LineString",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#BF93E4",
          "line-width": 5,
        },
      });



      const coordinates = geojson.features[0].geometry.coordinates;

      const bounds = new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]);

      // Extend the 'LngLatBounds' to include every coordinate in the bounds result.
      for (const coord of coordinates) {
        bounds.extend(coord);
      }

      map.fitBounds(bounds, {
        padding: 20,
        // });
      });
    });

  }
}
