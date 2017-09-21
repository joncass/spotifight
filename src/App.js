import React, { Component } from 'react'

import {
  Grid,
  Header,
  Loader,
  Segment,
} from 'semantic-ui-react'

import { fetchTrackData } from './data'
import TrackMatchup from './components/TrackMatchup'

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
      while (this.currentRoundTracks.length < POOL_SIZE) {
        const randomCategory = _randomElement(trackData)
        const randomTrack = _randomElement(randomCategory.tracks)
        this.currentRoundTracks.push({ url: randomTrack.url })
      }

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
        {
          this.state.winner
          ?
          <div>
            We have a <a href={this.state.winner.url}>winner!</a>
          </div>
          :
          <Grid.Column>
            <Header as='h1'>Round {this.round}</Header>
            <Header as='h3'>Matchup {this.matchup}</Header>
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
          </Grid.Column>
        }
      </Grid>
    )
  }
}

export default App
