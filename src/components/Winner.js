import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Segment,
} from 'semantic-ui-react'

import TrackInfo from './TrackInfo'
import TrackPlayer from './TrackPlayer'

class Winner extends Component {
  constructor(props) {
    super(props)
    this.track = this.props.track
  }

  render() {
    return (
      <Segment>
        <TrackInfo
          track={this.track}
        />
        <TrackPlayer
          track={this.track}
        />
      </Segment>
    )
  }
}

Winner.propTypes = {
  track: PropTypes.shape({
    artist: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })
}

export default Winner
