import React, { Component } from 'react'
import Sound from 'react-sound'

import { fetchTrackData } from './data'

const _randomElement = arr => (arr[Math.floor(Math.random()*arr.length)])

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playStatus: 'STOPPED',
    }
    this._fetchData()
  }

  _fetchData() {
    fetchTrackData().then(trackData => {
      const randomCategory = _randomElement(trackData)
      console.log('picked', randomCategory.category)
      const randomTrack = _randomElement(randomCategory.tracks)
      console.log('picked', randomTrack.name)
      this.setState({ trackURL: randomTrack.url })
    })
  }

  play() {
    this.setState({ playStatus: 'PLAYING' })
  }

  pause() {
    this.setState({ playStatus: 'PAUSED' })
  }

  render() {
    return (
      this.state.trackURL
      ?
      (
        <div>
          <button onClick={this.play.bind(this)}>Play</button>
          <button onClick={this.pause.bind(this)}>Pause</button>
          <Sound
            playStatus={Sound.status[this.state.playStatus]}
            url={this.state.trackURL}
          />
        </div>
      )
      :
      null
    )
  }
}

export default App
