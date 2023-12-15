import { storageService } from './async-storage.service.js'
// import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
// import axios from 'axios'
// import { store } from '../store/store'
// import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from './socket.service'
// import { showSuccessMsg } from './event-bus.service'
// import user from './../../data/user.json' assert {type: 'json'}

const STORAGE_KEY_LOGGED_USER = 'loggedinUser'
const USER_DB = 'user'

const BASE_URL = process.env.NODE_ENV === 'production' ? '/api/' : 'http://localhost:3030/api/'

export const userService = {
  login,
  logout,
  signup,
  getLoggedInUser,
  saveLocalUser,
  getUsers,
  getById,
  remove,
  update,
  changeScore,
  getEmptyUser
}

window.userService = userService

function getUsers() {
  return storageService.query(USER_DB)
  // return httpService.get(`user`)
}

function onUserUpdate(user) {
  showSuccessMsg(
    `This user ${user.fullname} just got updated from socket, new score: ${user.score}`
  )
  store.dispatch({ type: 'setWatchedUser', user })
}

async function getById(userId) {
  const user = await storageService.get(USER_DB, userId)
  // const user = await httpService.get(`user/${userId}`)
}
function remove(userId) {
  return storageService.remove('user', userId)
  // return httpService.delete(`user/${userId}`)
}

async function update({ _id, score }) {
  const user = await storageService.get(USER_DB, _id)
  // let user = getById(_id)
  // user.score = score
  // await storageService.put('user', user)

  // user = await httpService.put(`user/${user._id}`, user)
  // Handle case in which admin updates other user's details
  if (getLoggedinUser()._id === user._id) saveLocalUser(user)
  return user
}

async function login({ username, password }) {
  // const users = await storageService.query('user')
  // const user = users.find(user => user.username === userCred.username)
  try {
    const user = await httpService.post('auth/login', { username, password })
    console.log(user)
    if (user) {
      // socketService.login(user._id)
      return saveLocalUser(user)
    }
  } catch (error) {
    console.log(error)
  }
}
async function signup(userCred) {
  userCred.score = 10000
  if (!userCred.imgUrl)
    userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
  // const user = await storageService.post('user', userCred)
  const user = await httpService.post('auth/signup', userCred)
  socketService.login(user._id)
  return saveLocalUser(user)
}
async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  // socketService.logout()
  return await httpService.post('auth/logout')
}

async function changeScore(by) {
  const user = getLoggedinUser()
  if (!user) throw new Error('Not loggedin')
  user.score = user.score + by || by
  await update(user)
  return user.score
}

function saveLocalUser(user) {
  localStorage.setItem(STORAGE_KEY_LOGGED_USER, JSON.stringify(user))
  return user
}

function getLoggedInUser() {
  // debugger
  return JSON.parse(localStorage.getItem(STORAGE_KEY_LOGGED_USER))
}

function getEmptyUser() {
  return {
    fullname: '',
    username: '',
    email: '',
    imgUrl: ''
  }
}

; (() => {
    utilService.saveToStorage(STORAGE_KEY_LOGGED_USER, {
        _id: "u102",
        fullname: "Al Tamit",
        username: "al.amit",
        email: "al.tmit@gmail.com",
        password: "1234",
        imgUrl: "https://res.cloudinary.com/tal-amit-dev/image/upload/v1679773600/Instagram/WhatsApp_Image_2023-03-25_at_22.42.55_gh0eyd.jpg",
        color: 'steelblue'
    })
// login(user[0])
})()
