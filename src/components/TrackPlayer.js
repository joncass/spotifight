import React, { Component } from 'react'
import Sound from 'react-sound'

class TrackPlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playStatus: 'STOPPED',
      track: props.track,
    }
  }

  play() {
    this.setState({ playStatus: 'PLAYING' })
  }

  pause() {
    this.setState({ playStatus: 'PAUSED' })
  }

  stop() {
    this.setState({ playStatus: 'STOPPED' })
  }

  render() {
    return (
      <div>
        <button onClick={this.play.bind(this)}>Play</button>
        <button onClick={this.pause.bind(this)}>Pause</button>
        <button onClick={this.stop.bind(this)}>Stop</button>
        <Sound
          playStatus={Sound.status[this.state.playStatus]}
          url={this.state.track.url}
        />
      </div>
    )
  }
}

export default TrackPlayer
