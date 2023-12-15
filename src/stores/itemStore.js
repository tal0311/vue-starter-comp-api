import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { itemService } from '@/services/item.service.local.js'
import { showSuccessMsg } from '@/services/event-bus.service'

export const useItemStore = defineStore('item', () => {
  const items = ref(null)
  const currItem = ref(null)
  const filterBy = ref({ txt: '' })

  const getItems = computed(() => items?.value)
  const getCurrItem = computed(() => currItem?.value)

  async function loadItems() {
    items.value = await itemService.query(filterBy.value)
  }

  async function addItem(item) {
    const itemToAdd = await itemService.save(item)
    items.value.push(itemToAdd)
    showSuccessMsg('Item Added!')
  }

  async function removeItem(itemId) {
    await itemService.remove(itemId)
    const idx = items.value.findIndex((item) => item._id === itemId)
    items.value.splice(idx, 1)
    showSuccessMsg('Item Removed!')
  }

  async function updateItem({ itemId, key, value }) {
    const item = await itemService.getById(itemId)
    item[key] = value
    const itemToUpdate = await itemService.save(item)
    const idx = items.value.findIndex((item) => item._id === itemId)
    items.value.splice(idx, 1, itemToUpdate)
    showSuccessMsg('Item Updated!')
  }

  async function getItemById(itemId) {
    console.log('itemId', itemId)
    currItem.value = await itemService.getById(itemId)
  }

  return {
    loadItems,
    getItems,
    getCurrItem,
    addItem,
    removeItem,
    updateItem,
    getItemById
  }
})
