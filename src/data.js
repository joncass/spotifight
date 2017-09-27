import chill from './data/chill'
import classical from './data/classical'
import country from './data/country'
import decades from './data/decades'
import edm_dance from './data/edm_dance'
import focus from './data/focus'
import gaming from './data/gaming'
import hiphop from './data/hiphop'
import jazz from './data/jazz'
import latin from './data/latin'
import mood from './data/mood'
import party from './data/party'
import pop from './data/pop'
import rnb from './data/rnb'
import rock from './data/rock'
import workout from './data/workout'

const trackData = {
  chill,
  classical,
  country,
  decades,
  edm_dance,
  focus,
  gaming,
  hiphop,
  jazz,
  latin,
  mood,
  party,
  pop,
  rnb,
  rock,
  workout,
}

export const fetchTrackData = () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(trackData)
    }, 250)
  })

  return promise
}