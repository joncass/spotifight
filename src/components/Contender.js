import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  Card,
} from 'semantic-ui-react'

import TrackPlayer from './TrackPlayer'

class Contender extends Component {
  constructor(props) {
    super(props)

    this.onChoose = this.props.onChoose
    this.onPlay = this.props.onPlay
    this.state = {
      track: this.props.track,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      track: nextProps.track,
    })
  }

  pause() {
    this.refs.trackPlayer.pause()
  }

  render() {
    return (
      <Card>
        <Button
          icon='heart'
          onClick={() => this.onChoose()}
          size='massive'
          primary
        />
        <Card.Content>
          <TrackPlayer
            ref="trackPlayer"
            onPlay={() => this.onPlay()}
            track={this.state.track}
          />
        </Card.Content>
      </Card>
    )
  }
}

Contender.propTypes = {
  onPlay: PropTypes.func.isRequired,
  onChoose: PropTypes.func.isRequired,
  track: PropTypes.shape({
    artist: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
}

export default Contender
