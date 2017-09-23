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
      track: props.track,
    }
  }

  play() {
    this.setState({ playStatus: 'PLAYING' })
    if (this.props.onPlay) {
      this.props.onPlay()
    }
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
        <Button.Group labeled>
          <Button icon='play' onClick={this.play.bind(this)} />
          <Button icon='pause' onClick={this.pause.bind(this)} />
          <Button icon='stop' onClick={this.stop.bind(this)} />
        </Button.Group>
        <Sound
          playStatus={Sound.status[this.state.playStatus]}
          url={this.state.track.url}
        />
      </div>
    )
  }
}

export default TrackPlayer
