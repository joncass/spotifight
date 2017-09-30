import React, { Component } from 'react'

import {
  Grid,
} from 'semantic-ui-react'

import { fetchTrackData } from './data'
import Tournament from './components/Tournament'

const _randomElement = arr => (arr[Math.floor(Math.random()*arr.length)])
const POOL_SIZE = 16

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    fetchTrackData().then(trackData => {
      const categories = Object.keys(trackData)
      const tournamentTracks = []

      while (tournamentTracks.length < POOL_SIZE) {
        const category = categories[tournamentTracks.length % categories.length]
        const tracks = trackData[category]
        const randomTrack = _randomElement(tracks)
        tournamentTracks.push(randomTrack)
      }

      this.setState({ tournamentTracks })
    })
  }

  render() {
    return (
      <Grid
        textAlign='center'
        style={{ height: '100%' }}
        verticalAlign='middle'
        columns={2}
        padded
      >
        <Grid.Column>
          {
            this.state.tournamentTracks
            ?
            <Tournament tracks={this.state.tournamentTracks} />
            :
            <div>loading ...</div>
          }
          </Grid.Column>
      </Grid>
    )
  }
}

export default App
