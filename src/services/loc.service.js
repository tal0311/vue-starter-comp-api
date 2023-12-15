import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

export const locService = {
  getLocs,
  save,
  removeLoc,
  getLocById,
  createLoc,
  getEmptyLoc,
  updateLocLabel
}

const LOCS_KEY = 'locationsDB'
createLocations()

async function getLocs(filterBy) {
  console.log(filterBy)
  // debugger
  let locs = await storageService.query(LOCS_KEY)

  if (filterBy.isFav) {
    locs = locs.filter((loc) => loc.isFav)
  }
  if (filterBy.txt) {
    const regex = new RegExp(filterBy.txt, 'i')
    locs = locs.filter((loc) => regex.test(loc.name))
  }
  if (filterBy.type && filterBy.type.length) {
    locs = locs.filter((loc) => loc.labels.some((label) => filterBy.type.includes(label)))
  }
  return locs
}

async function save(loc) {
  if (loc._id) return await storageService.put(LOCS_KEY, loc)
  else return await storageService.post(LOCS_KEY, loc)
}

async function removeLoc(locId) {
  return await storageService.remove(LOCS_KEY, locId)
}

async function getLocById(locId) {
  return await storageService.get(LOCS_KEY, locId)
}

async function updateLocLabel(locId, label) {
  const locToUpdate = await getLocById(locId)
  locToUpdate.labels.includes(label) ? locToUpdate.labels.splice(locToUpdate.labels.indexOf(label), 1) : locToUpdate.labels.push(label)
  return await save(locToUpdate)
}

function createLoc(name, lat, lng, weather, createdAt, updatedAt) {
  return {
    name,
    lat,
    lng,
    weather,
    createdAt,
    updatedAt
  }
}

function getEmptyLoc() {
  return {
    name: '',
    lat: null,
    lng: null,
    weather: '',
    createdAt: null,
    updatedAt: null,
    labels: [],
    note: 'Add notes to this location',
    imgUrl: 'https://source.unsplash.com/random/800x800?beach',
    photo: null
  }
}

function createLocations() {
  let locations = utilService.loadFromStorage(LOCS_KEY)
  if (!locations || !locations.length) {
    locations = [
      {
        _id: utilService.makeId(),
        name: 'Greatplace',
        lat: 32.047104,
        lng: 34.832384,
        photo: null,
        note: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero mollitia, consequatur accusantium saepe architecto, perferendis adipisci beatae consequuntur eum facere assumenda similique quod ullam facilis at minima! Deleniti, ipsa illum.',
        createdAt: Date.now(),
        updatedAt: null,
        imgUrl: 'https://source.unsplash.com/random/800x800?river',
        isFav: true,
        labels: ['forest', 'hiking']
      },
      {
        _id: utilService.makeId(),
        name: 'Neveragain',
        lat: 32.047201,
        lng: 34.832581,
        photo: null,
        note: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero mollitia, consequatur accusantium saepe architecto, perferendis adipisci beatae consequuntur eum facere assumenda similique quod ullam facilis at minima! Deleniti, ipsa illum.',
        createdAt: Date.now(),
        updatedAt: null,
        imgUrl: 'https://source.unsplash.com/random/800x800?forest',
        isFav: false,
        labels: ['beach', 'hiking']
      }
    ]
    utilService.saveToStorage(LOCS_KEY, locations)
  }
  return locations
}
