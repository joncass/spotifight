import React, { Component } from 'react'

import {
  Grid,
  Header,
  Loader,
  Segment,
} from 'semantic-ui-react'

import { fetchTrackData } from './data'
import TrackMatchup from './components/TrackMatchup'
import Winner from './components/Winner'

const _randomElement = arr => (arr[Math.floor(Math.random()*arr.length)])
const POOL_SIZE = 16

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tracks: null,
    }

    this.round = 1
    this.matchup = 0

    this.currentRoundTracks = []
    this.nextRoundTracks = []

    this._fetchData()
  }

  _fetchData() {
    fetchTrackData().then(trackData => {
      const categories = Object.keys(trackData)
      while (this.currentRoundTracks.length < POOL_SIZE) {
        const category = categories[this.currentRoundTracks.length % categories.length]
        const tracks = trackData[category]
        const randomTrack = _randomElement(tracks)
        this.currentRoundTracks.push(randomTrack)
      }
      this.numberOfRounds = Math.log(this.currentRoundTracks.length) / Math.log(2)
      this.matchupsThisRound = this.currentRoundTracks.length / 2
      this._createMatchup()
    })
  }

  _createMatchup() {
    this.matchup = this.matchup + 1
    this.setState({
      tracks: [
        this.currentRoundTracks.pop(), this.currentRoundTracks.pop()
      ]
    })
  }

  _newRound() {
    this.currentRoundTracks = this.nextRoundTracks.slice()
    this.matchupsThisRound = this.currentRoundTracks.length / 2
    this.nextRoundTracks = []
    this._createMatchup()

    this.round = this.round + 1
    this.matchup = 1
  }

  choose(track) {
    this.nextRoundTracks.push(track)
    this.setState({ tracks: null }, () => {

      if (this.currentRoundTracks.length) {
        this._createMatchup()
      }
      else if (this.nextRoundTracks.length > 1) {
        this._newRound()
      }
      else {
        const winner = this.nextRoundTracks[0]
        this.setState({ winner })
      }
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
            this.state.winner
            ?
            <Winner winner={this.state.winner} />
            :
            <div>
              <Header as='h1'>Round {this.round} of {this.numberOfRounds}</Header>
              <Header as='h3'>Matchup {this.matchup} of {this.matchupsThisRound}</Header>
              {
                this.state.tracks
                ?
                <TrackMatchup
                  tracks={this.state.tracks}
                  onChoose={track => { this.choose(track) }}
                />
                :
                <Segment basic>
                  <Loader active size='big' />
                </Segment>
              }
            </div>
          }
          </Grid.Column>
      </Grid>
    )
  }
}

export default App
