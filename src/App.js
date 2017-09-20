import React, { Component } from 'react'

import { fetchTrackData } from './data'
import TrackMatchup from './components/TrackMatchup'

const _randomElement = arr => (arr[Math.floor(Math.random()*arr.length)])

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tracks: null,
    }
    this._fetchData()
  }

  _fetchData() {
    fetchTrackData().then(trackData => {
      const randomCategory1 = _randomElement(trackData)
      const randomTrack1 = _randomElement(randomCategory1.tracks)
      const randomCategory2 = _randomElement(trackData)
      const randomTrack2 = _randomElement(randomCategory2.tracks)
      this.setState({ tracks: [
        {
          url: randomTrack1.url,
        },
        {
          url: randomTrack2.url,
        },
      ]})
    })
  }

  render() {
    return (
      this.state.tracks
      ?
      (
        <TrackMatchup
          tracks={this.state.tracks}
        />
      )
      :
      null
    )
  }
}

export default App
