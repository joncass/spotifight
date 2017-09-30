import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Matchup from './Matchup'
import Winner from './Winner'

class Tournament extends Component {
  constructor(props) {
    super(props)

    const trackLength = props.tracks.length
    if (trackLength && (trackLength & (trackLength - 1))) {
      throw new Error("Invalid number of tracks (must be power of 2).")
    }

    this.matchups = this.createMatchups(props.tracks)

    this.state = {
      currentRoundIndex: 0,
      currentMatchupIndex: 0,
    }
  }

  /**
   * Divide a set of tracks into matchups.
   *
   * @param {array} tracks - The tracks to divide into matchups.
   */
  createMatchups(tracks) {
    const tracksCopy = tracks.slice()
    const matchups = []
    while (tracksCopy.length) {
      matchups.push({
        tracks: [ tracksCopy.pop(), tracksCopy.pop() ],
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
      <div>
        {
          this.state.winner
          ?
          <Winner track={this.state.winner} />
          :
          <div>
            <div>Round {round}</div>
            <div>Matchup {matchup}</div>
            <Matchup
              contenders={this.matchups[this.state.currentMatchupIndex].tracks}
              onChooseContender={index => this.selectWinnerForCurrentMatchup(index)}
            />
          </div>
        }
      </div>
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
