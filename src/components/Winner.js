import React, { Component } from 'react'
import Sound from 'react-sound'

import {
  Button,
  Header,
  Image,
  Segment,
} from 'semantic-ui-react'

class Winner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playStatus: 'STOPPED',
      track: props.winner,
    }
  }

  play() {
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
      <Segment>
        <Image
          src={this.state.track.imageURL}
          size="large"
          centered
        />
        <Header as='h3'>
          You chose {this.state.track.name} by {this.state.track.artist}
        </Header>
        <Button.Group labeled>
          <Button icon='play' onClick={this.play.bind(this)} />
          <Button icon='pause' onClick={this.pause.bind(this)} />
          <Button icon='stop' onClick={this.stop.bind(this)} />
        </Button.Group>
        <Sound
          playStatus={Sound.status[this.state.playStatus]}
          url={this.state.track.url}
        />
      </Segment>
    )
  }
}

export default Winner
