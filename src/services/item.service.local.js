import { storageService } from './async-storage.service.js'
// import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
// import { userService } from './user.service.js'

import items from './../data/items.json'
const STORAGE_KEY = 'item_DB'

export const itemService = {
  query,
  getById,
  save,
  remove,
  getEmptyItem,
  addItemMsg
}
window.itemsService = itemService

async function query(filterBy) {
  // return httpService.get(STORAGE_KEY, filterBy)

  let items = await storageService.query(STORAGE_KEY)
  if (filterBy.txt) {
    const regex = new RegExp(filterBy.txt, 'i')
    items = items.filter((item) => regex.test(item.vendor) || regex.test(item.description))
  }
  return items
}
function getById(itemId) {
  return storageService.get(STORAGE_KEY, itemId)
  // return httpService.get(`item/${itemId}`)
}

async function remove(itemId) {
  await storageService.remove(STORAGE_KEY, itemId)
  // return httpService.delete(`item/${itemId}`)
}
async function save(item) {
  var savedItem
  if (item._id) {
    savedItem = await storageService.put(STORAGE_KEY, item)
    // savedItem = await httpService.put(`item/${item._id}`, item)
  } else {
    // Later, owner is set by the backend
    // item.owner = userService.getLoggedinUser()
    savedItem = await storageService.post(STORAGE_KEY, item)
    // savedItem = await httpService.post('item', item)
  }
  return savedItem
}

async function addItemMsg(itemId, txt) {
  // const savedMsg = await httpService.post(`item/${itemId}/msg`, {txt})
  return savedMsg
}

function getEmptyItem() {
  return {
    name: '',
    latitude: 40.7128,
    longitude: -74.006,
    imageUrl: 'https://example.com/newyork.jpg',
    photos: []
  }
}

// TEST DATA
;(async () => {
  utilService.saveToStorage(STORAGE_KEY, items)
})()
