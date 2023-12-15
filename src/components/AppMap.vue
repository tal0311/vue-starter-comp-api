<template>
  <section class="app-map">
    <GoogleMap
      :api-key="MAP_KEY"
      style="width: 100%; height: 500px"
      :center="currLoc"
      :zoom="15"
      @click="handleMapClick"
    >
      <GoogleInfoWindow
        v-if="showInfoWindow"
        :position="infoWindowPosition"
        @closeclick="showInfoWindow = false"
      >
        <section class="info-window grid">
          <h3>Selected location</h3>
          <input v-model="selectedPos.name" type="text" placeholder="Name this location" />
          <div class="info-actions grid">
            <button @click="handleAddPos">Add location</button>
            <button>cancel</button>
          </div>
        </section>
      </GoogleInfoWindow>

      <Marker :options="{ position: currLoc }" />
    </GoogleMap>
  </section>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import { locService } from '@/services/loc.service.js'
import { GoogleMap, Marker } from 'vue3-google-map'
import { useLocsStore } from '@/stores/locsStore'

const center = { lat: 40.689247, lng: -74.044502 }
const MAP_KEY = import.meta.env.VITE_MAP_API_KEY

const infoWindowPosition = ref(null)
const showInfoWindow = ref(false)

function handleMapClick(ev) {
  const { lat, lng } = ev.latLng
  infoWindowPosition.value = { lat: lat(), lng: lng() }
  showInfoWindow.value = !showInfoWindow.value
  selectedPos.value.lat = lat()
  selectedPos.value.lng = lng()
}

const emit = defineEmits(['add-location'])
const selectedPos = ref(locService.getEmptyLoc())
function handleAddPos() {
  selectedPos.value
  showInfoWindow.value = false
  emit('add-location', { ...selectedPos.value })
}

const locsStore = useLocsStore()
const currLoc = computed(() => {
  return locsStore.getCurrLoc
})

watchEffect(() => {})
</script>

<style lang="scss" scoped>
@import '@/assets//styles/setup/mixins.scss';
@import '@/assets/styles/setup/variables.scss';

.info-window {
  display: grid;
  grid-auto-flow: row;
  width: 50vw;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 0.5rem;
  border-radius: 4px;
  gap: 0.5rem;
  max-width: 400px;

  .info-actions {
    justify-content: space-between;
    grid-auto-flow: column;

    button:first-child {
      @include app-btn(5px, 5px);
    }

    button:last-child {
      @include app-btn(5px, 5px, $clr2);
    }
  }

  button {
  }

  input {
    border: none;
    background: lightgray;
    padding: 0.4rem;
    border-radius: 2px;
  }
}
</style>
