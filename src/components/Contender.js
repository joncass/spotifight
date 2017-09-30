import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  Segment,
} from 'semantic-ui-react'

import TrackPlayer from './TrackPlayer'

class Contender extends Component {
  constructor(props) {
    super(props)
    this.onChoose = this.props.onChoose
    this.track = this.props.track
  }

  render() {
    return (
      <Segment>
        <Button
          icon='heart'
          onClick={() => this.onChoose()}
          size='massive'
          primary
        />
        <TrackPlayer
          track={this.track}
        />
      </Segment>
    )
  }
}

Contender.propTypes = {
  onChoose: PropTypes.func.isRequired,
  track: PropTypes.shape({
    artist: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
}

export default Contender
