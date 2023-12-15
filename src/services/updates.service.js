import { storageService } from '@/services/async-storage.service'
import { utilService } from '@/services/util.service'

export const updateService = {
  getUpdatesByLocationId,
  getUpdateByType,
  addUpdate
}

const DB_KEY = 'updatesDB'
createUpdates()

async function getUpdatesByLocationId(locId) {
  return await storageService.get(DB_KEY, locId)
}

async function getAllUpdates() {
  return await storageService.query(DB_KEY)
}

async function addUpdate(updateType, locId) {
  const loc = await getUpdatesByLocationId(locId)
  loc.history.push(createUpdate(updateType))
  return loc.history.at(-1)
}

function createUpdate(type) {
  return {
    type,
    updatedAt: Date.now()
  }
}

function getUpdateByType(type) {
  const opts = {
    weather: 'You have checked the weather for this location at ',
    note: 'You have updated your notes for this location at ',
    favorite: 'you have added this location to your favorites at '
  }
  return opts[type] || ''
}

function createUpdates() {
  let updates = utilService.loadFromStorage(DB_KEY)
  if (!updates || !updates.length) {
    const locs = utilService.loadFromStorage('locationsDB')
    updates = [
      { _id: locs[0]._id, history: [createUpdate('weather'), createUpdate('note')] },
      { _id: locs[1]._id, history: [createUpdate('note'), createUpdate('note')] }
    ]
    utilService.saveToStorage(DB_KEY, updates)
  }
  return updates
}
