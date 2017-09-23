import React, { Component } from 'react'

import {
  Button,
  Card,
} from 'semantic-ui-react'

import TrackPlayer from './TrackPlayer'

class TrackMatchup extends Component {

  choose(id) {
    this.props.onChoose(id)
  }

  render() {
    return (
      <Card.Group>
        <Card>
          <Card.Content>
            <Button
              icon='heart'
              onClick={() => { this.choose(this.props.tracks[0]) }}
              size='massive'
              primary
            />
          </Card.Content>
          <Card.Content>
            <TrackPlayer
              track={this.props.tracks[0]}
              ref="trackPlayer0"
              onPlay={() => { this.refs.trackPlayer1.pause() }}
            />
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <Button
              icon='heart'
              onClick={() => { this.choose(this.props.tracks[1]) }}
              size='massive'
              primary
            />
          </Card.Content>
          <Card.Content>
            <TrackPlayer
              track={this.props.tracks[1]}
              ref="trackPlayer1"
              onPlay={() => { this.refs.trackPlayer0.pause() }}
            />
          </Card.Content>
        </Card>
      </Card.Group>
    )
  }
}

export default TrackMatchup
