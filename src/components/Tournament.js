import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Container,
  Step,
} from 'semantic-ui-react'

import Matchup from './Matchup'
import Winner from './Winner'

class Tournament extends Component {
  constructor(props) {
    super(props)

    this.initializeMatchups(props.tracks)

    this.state = {
      currentRoundIndex: 0,
      currentMatchupIndex: 0,
      // if there are no matchups after initializeMatchups, it means
      // there's only a single track, so we declare it winner
      winner: this.matchups.length ? null : props.tracks[0]
    }
  }

  initializeMatchups(tracks) {
    // round the tracks to have length a power of 2
    const sliceEnd = 2**Math.floor(Math.log2(tracks.length))
    const slicedTracks = tracks.slice(0, sliceEnd)

    this.matchups = this.createMatchups(slicedTracks)
  }

  /**
   * Divide a set of tracks into matchups.
   *
   * @param {array} tracks - The tracks to divide into matchups.
   */
  createMatchups(tracks) {
    const matchups = []
    while (tracks.length > 1) {
      matchups.push({
        tracks: [ tracks.pop(), tracks.pop() ],
        winner: null,
      })
    }
    return matchups
  }

  declareWinner(winner) {
    this.setState({ winner })
  }

  startNextRound() {
    const winners = this.matchups.map(matchup => matchup.tracks[matchup.winner])
    if (winners.length === 1) {
      this.declareWinner(winners[0])
    }
    else {
      this.matchups = this.createMatchups(winners)
      this.setState({
        currentRoundIndex: this.state.currentRoundIndex + 1,
      })
    }
  }

  startNextMatchup() {
    if (this.state.currentMatchupIndex === this.matchups.length - 1) {
      this.setState({
        currentMatchupIndex: 0,
      })
      this.startNextRound()
    }
    else {
      this.setState({
        currentMatchupIndex: this.state.currentMatchupIndex + 1,
      })
    }
  }

  /**
   * @param {int} winner - 0 if the first track won, and 1 for the second.
   */
  selectWinnerForCurrentMatchup(winner) {
    const currentMatchup = this.matchups[this.state.currentMatchupIndex]
    currentMatchup.winner = winner
    this.startNextMatchup()
  }

  render() {
    const round = this.state.currentRoundIndex + 1
    const matchup = this.state.currentMatchupIndex + 1

    return (
      <Container>
        {
          this.state.winner
          ?
          <Winner track={this.state.winner} />
          :
          <Container>
            <Step.Group size="massive">
              <Step>
                <Step.Content title={`Round ${round}`} />
              </Step>
              <Step>
                <Step.Content title={`Matchup ${matchup}`} />
              </Step>
            </Step.Group>
            <Matchup
              contenders={this.matchups[this.state.currentMatchupIndex].tracks}
              onChooseContender={index => this.selectWinnerForCurrentMatchup(index)}
            />
          </Container>
        }
      </Container>
    )
  }
}

Tournament.propTypes = {
  tracks: PropTypes.arrayOf(
    PropTypes.shape({
      artist: PropTypes.string.isRequired,
      imageURL: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  )
}

export default Tournament
