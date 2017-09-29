import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
        <Button icon='play' onClick={() => this.play()} />
        <Button icon='pause' onClick={() => this.pause()} />
        <Button icon='stop' onClick={() => this.stop()} />
        <Sound
          playStatus={Sound.status[this.state.playStatus]}
          url={this.track.url}
        />
      </Button.Group>
    )
  }
}

TrackPlayer.propTypes = {
  onPlay: PropTypes.func,
  track: PropTypes.shape({
    artist: PropTypes.string,
    imageURL: PropTypes.string,
    name: PropTypes.string,
    url: PropTypes.string.isRequired,
  }).isRequired,
}

export default TrackPlayer
