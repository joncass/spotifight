import React, { Component } from 'react'

import {
  Grid,
  Loader,
  Segment,
} from 'semantic-ui-react'

import { fetchTrackData } from './data'
import TrackMatchup from './components/TrackMatchup'

const _randomElement = arr => (arr[Math.floor(Math.random()*arr.length)])

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tracks: null,
    }
    this._fetchData()
  }

  _fetchData() {
    this.setState({ tracks: null })
    fetchTrackData().then(trackData => {
      const randomCategory1 = _randomElement(trackData)
      const randomTrack1 = _randomElement(randomCategory1.tracks)
      const randomCategory2 = _randomElement(trackData)
      const randomTrack2 = _randomElement(randomCategory2.tracks)
      this.setState({ tracks: [
        {
          url: randomTrack1.url,
        },
        {
          url: randomTrack2.url,
        },
      ]})
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
            this.state.tracks
            ?
            <TrackMatchup
              tracks={this.state.tracks}
              onChoose={() => { this._fetchData() }}
            />
            :
            <Segment basic>
              <Loader active size='big' />
            </Segment>
          }
        </Grid.Column>
      </Grid>
    )
  }
}

export default App
