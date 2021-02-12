<template>
 <div id="map">
        <l-map :center="[-23.752961, -57.854357]" :zoom="6" style="height: 500px;" :options="mapOptions">
                <l-choropleth-layer :data="citiesData" title-key="cityName" id-key="cityId" :value="value" 
                :extra-values="extraValues" geojson-id-key="dpto" :geojson="geojson" :color-scale="colorScale">
                    <template slot-scope="props">
                            <l-info-control :item="props.currentItem" :unit="props.unit" title="Department" placeholder="Hover over a department" position="topright">
                            </l-info-control>
                            <l-reference-chart title="Girls school enrolment" :color-scale="colorScale" :min="props.min" :max="props.max" position="bottomleft">
                            </l-reference-chart>
                    </template>
                </l-choropleth-layer>
        </l-map>
    </div>
</template>

<script>
/* eslint-disable */
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import { citiesData } from './data/cities-data';

import {geojson} from './data/paraguay.js';
import { InfoControl, ReferenceChart, ChoroplethLayer } from 'vue-choropleth';
import { LMap } from 'vue2-leaflet';
import SearchComponent from '@/components/search/SearchComponent';

export default {
  name: 'Map',
  data() {
    return {
      info: L.control(),
      geojson: null,
      items: [], // {cityName:'nermeen', idKey:'dpto'} ???
      colorScale: ['e7d090', 'e9ae7b', 'de7062'],
      value: {
        key: 'pharmaciesCount',
        metric: ': pharmacies'
      },
      mapOptions: {
        style: function style(feature) {
          return {
            weight: 4,
            opacity: 0.7,
            color: '#d95656',
            fillOpacity: 0.3
          };
        },
        onEachFeature: onEachFeature.bind(this),
      },
      map: null,
      latlng: [],
      mounted: false,
           center: [-23.752961, -57.854357],
        citiesData,
        geojson,
        colorScale: ["e7d090", "e9ae7b", "de7062"],
        value: {
            key: "pharmaciesCount",
            metric: "% girls"
        },
        extraValues: [{
            key: "amount_m",
            metric: "% boys"
        }],
        mapOptions: {
            attributionControl: false
        }
    };
  },
  components: {
    SearchComponent,
    LMap,
    'l-info-control': InfoControl,
    'l-reference-chart': ReferenceChart,
    'l-choropleth-layer': ChoroplethLayer
  },
  mounted() {
    // this.geojson = L.geoJson(statesData, {
    //   style: style,
    //   onEachFeature: onEachFeature
    // })
    //   .addTo(map);

  },
  methods: {
    onReady() {
      this.map = this.$refs.myMap.mapObject;
      this.map.onclick = (e) => {
        console.log(e);
        if (e.path[0] && e.path[0]._leaflet_id) {
          this.querySelection(e.path[0]._leaflet_id);
        }
      };
      this.map.on('click',  (e) => {
        console.log(this.map);
        console.log(e);
        if (e.path && e.path[0]._leaflet_id) {
          this.querySelection(e.path[0]._leaflet_id);
        }
        // alert(e.features[0].properties.name)
      });
    },

    querySelection(selectionId) {
      alert(selectionId);

      /**
       * Mafraq -->
       */

    }
  },
};

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature
  });
}

function zoomToFeature(e) {
  console.log(e.target.feature.properties.name);
  map.fitBounds(e.target.getBounds());
}

function highlightFeature(e) {
          debugger;

  var layer = e.target;

  layer.setStyle({
    weight: 5,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.3
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }

  this.info.update(layer.feature.properties);
}

function resetHighlight(e) {
  this.geojson.resetStyle(e.target);
  this.info.update();
}
</script>

<style scoped>
#map {
  width: 100vw;
  height: 50vh;
  @media screen and (max-width: 600px) {
    height: 10vh;
  }
}
</style>
