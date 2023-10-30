<template>
  <ol-map
    :load-tiles-while-animating="true"
    :load-tiles-while-interacting="true"
    style="height: 100%; width: 100%"
  >
    <ol-view
      ref="view"
      :center="[locationX, locationY]"
      :zoom="zoom"
      :rotation="rotation"
      :projection="projection"
    />

    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>
    <!-- v-for="app in coordinates" атрибут нижней строки-->
    <!-- :key="app.id" -->

    <ol-vector-layer>
      <ol-source-vector>
        <ol-feature>
          <ol-geom-multi-point
            :coordinates="[
              [39.545865, 40.451698],
              [39.345865, 4.551698],
              [39.445865, 40.351698],
            ]"
          ></ol-geom-multi-point>
          <ol-style>
            <ol-style-circle :radius="radius">
              <ol-style-fill :color="fillColor"></ol-style-fill>
              <ol-style-stroke
                :color="strokeColor"
                :width="strokeWidth"
              ></ol-style-stroke>
            </ol-style-circle>
          </ol-style>
        </ol-feature>
      </ol-source-vector>
    </ol-vector-layer>
  </ol-map>
</template>

<script setup>
import { ref, inject } from "vue";

const props = defineProps({
  locationX: {
    type: Number,
    required: false,
    default: 39.76087898627143,
  },
  locationY: {
    type: Number,
    required: false,
    default: 47.23134789834382,
  },
  zoom: {
    type: Number,
    required: true,
    default: 12,
  },
});

const projection = ref("EPSG:4326");
const rotation = ref(0);
const format = inject("ol-format");
const geoJson = new format.GeoJSON();

const setLocation = (event) => {
  const coordinates = event.mapBrowserEvent.coordinate;
  props.locationX = coordinates[0];
  props.locationY = coordinates[1];
};
</script>

<style lang="scss">
.product-map {
  position: relative;
}
</style>
