import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Container,
  Header,
  Image,
} from 'semantic-ui-react'

class TrackInfo extends Component {
  constructor(props) {
    super(props)
    this.track = this.props.track
  }

  trackInfoText() {
    return `You chose ${this.track.name} by ${this.track.artist}`
  }

  render() {
    return (
      <Container>
        <Image
          src={this.track.imageURL}
          size="large"
          centered
        />
        <Header as='h3'>
          {this.trackInfoText()}
        </Header>
      </Container>
    )
  }
}

TrackInfo.propTypes = {
  track: PropTypes.shape({
    artist: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string,
  }).isRequired,
}

export default TrackInfo
