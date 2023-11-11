<template>
  <ol-map
    :load-tiles-while-animating="true"
    :load-tiles-while-interacting="true"
    style="height: 100%; width: 100%"
    ref="mapRef"
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

    <ol-vector-layer>
      <ol-source-vector>
        <ol-feature v-for="(loc, index) in locations" :key="index">
          <ol-geom-point :coordinates="[loc.x, loc.y]"></ol-geom-point>
          <ol-style>
            <ol-style-circle :radius="5">
              <ol-style-fill
                :color="getPriorityColor(loc.priority)"
              ></ol-style-fill>
              <ol-style-stroke :color="'black'" :width="2"></ol-style-stroke>
            </ol-style-circle>
          </ol-style>
        </ol-feature>
      </ol-source-vector>
    </ol-vector-layer>
  </ol-map>
</template>

<script setup>
import { ref, inject, onMounted } from "vue";
import Translate from "ol/interaction/Translate";

const props = defineProps({
  locationX: {
    type: Number,
    required: false,
    default: 39.723284,
  },
  locationY: {
    type: Number,
    required: false,
    default: 47.23135,
  },
  zoom: {
    type: Number,
    required: true,
    default: 12,
  },
  locations: {
    type: Array,
    required: true,
  },
  draggableMarkers: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const projection = ref("EPSG:4326");
const rotation = ref(0);
const format = inject("ol-format");
const geoJson = new format.GeoJSON();
const mapRef = ref(null);

onMounted(() => {
  if (props.draggableMarkers) {
    const translate = new Translate();
    mapRef.value.getInteractions().extend([translate]);

    translate.on("translateend", (evt) => {
      const feature = evt.features.item(0);
      const coordinates = feature.getGeometry().getCoordinates();
      console.log("Marker moved to: ", coordinates);
    });
  }
});

const getPriorityColor = (priority) => {
  const priorityColors = {
    "1 – незамедлительно": "red",
    "2 – высокий": "orange",
    "3 – средний": "yellow",
    "4 – низкий": "green",
  };
  return priorityColors[priority] || "blue";
};
</script>

<style scoped></style>
