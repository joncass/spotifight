import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Card,
  Icon,
  Label,
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
      <Card fluid>
        <TrackInfo
          track={this.track}
        />
        <Label color="green">
          <Icon name='winner' /> Winner
        </Label>
        <Card.Content>
          <TrackPlayer
            track={this.track}
          />
        </Card.Content>
      </Card>
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
