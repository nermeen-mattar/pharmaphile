<template>
  <div id="map">
    <l-map
      ref="myMap"
      :center="[30.5852, 36.2384]"
      :options="mapOptions"
      :zoom="7"
      @ready="onReady()">
      <l-choropleth-layer
        :colorScale="colorScale"
        :data="items"
        :geojson="paraguayGeojson"
        @mouseover="console.log('Modde')"
        :value="value"
        geojsonIdKey="dpto"
        idKey="department_id"
        titleKey="department_name">
        <!--        <template slot-scope="props">-->
        <!--          <l-info-control :item="props.currentItem" :unit="props.unit" title="Jordan Cities" placeholder="Hover over a city"/>-->
        <!--          <l-reference-chart title="Pharmacies in Jordan" :colorScale="colorScale" :min="props.min" :max="props.max" position="topright"/>-->
        <!--        </template>-->
      </l-choropleth-layer>
    </l-map>
    <search-component></search-component>
  </div>
</template>

<script>
/* eslint-disable */
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import { pyDepartmentsData } from './data/py-departments-data';
import paraguayGeojson from './data/paraguay.json';
import { InfoControl, ReferenceChart, ChoroplethLayer } from 'vue-choropleth';
import { LMap } from 'vue2-leaflet';
import SearchComponent from '@/components/search/SearchComponent';

export default {
  name: 'Map',
  data() {
    return {
      info: L.control(),
      geojson: null,
      items: [],
      paraguayGeojson,
      colorScale: ['e7d090', 'e9ae7b', 'de7062'],
      value: {
        key: 'amount_w',
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
