import React, { Component } from 'react'

import {
  Button,
  Card,
} from 'semantic-ui-react'

import TrackPlayer from './TrackPlayer'

class TrackMatchup extends Component {

  choose(id) {
    console.log(id)
  }

  render() {
    return (
      <Card.Group>
        <Card>
          <Card.Content>
            <Button
              icon='heart'
              onClick={() => { this.choose(0) }}
              size='massive'
              primary
            />
          </Card.Content>
          <Card.Content>
            <TrackPlayer
              track={this.props.tracks[0]}
            />
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <Button
              icon='heart'
              onClick={() => { this.choose(1) }}
              size='massive'
              primary
            />
          </Card.Content>
          <Card.Content>
            <TrackPlayer
              track={this.props.tracks[1]}
            />
          </Card.Content>
        </Card>
      </Card.Group>
    )
  }
}

export default TrackMatchup
