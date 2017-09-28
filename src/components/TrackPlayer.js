import React, { Component } from 'react'
import Sound from 'react-sound'

import {
  Button,
} from 'semantic-ui-react'

class TrackPlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playStatus: 'STOPPED',
    }

    this.onPlay = this.props.onPlay || ( () => {} )
    this.track = this.props.track
  }

  play() {
    this.onPlay()
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
      <Button.Group labeled>
        <Button icon='play' onClick={this.play.bind(this)} />
        <Button icon='pause' onClick={this.pause.bind(this)} />
        <Button icon='stop' onClick={this.stop.bind(this)} />
        <Sound
          playStatus={Sound.status[this.state.playStatus]}
          url={this.track.url}
        />
      </Button.Group>
    )
  }
}

export default TrackPlayer
