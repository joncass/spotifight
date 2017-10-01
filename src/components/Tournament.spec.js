import React from 'react'
import Enzyme, { mount } from 'enzyme'

import Matchup from './Matchup'
import Tournament from './Tournament'

describe('Tournament', () => {
  let tournament, tracks

  beforeEach(() => {
    tracks = [
      {
        artist: 'some artist',
        imageURL: 'http://image.url.com',
        name: 'some name',
        url: 'http://some.url.com',
      },
      {
        artist: 'some artist 2',
        imageURL: 'http://image.url2.com',
        name: 'some name 2',
        url: 'http://some.url2.com',
      },
      {
        artist: 'some artist 3',
        imageURL: 'http://image.url3.com',
        name: 'some name 3',
        url: 'http://some.url3.com',
      },
      {
        artist: 'some artist 4',
        imageURL: 'http://image.url4.com',
        name: 'some name 4',
        url: 'http://some.url4.com',
      },
      // tracks 5 and 6 will be ignored when it rounds to a power of 2
      {
        artist: 'some artist 5',
        imageURL: 'http://image.url5.com',
        name: 'some name 5',
        url: 'http://some.url5.com',
      },
      {
        artist: 'some artist 6',
        imageURL: 'http://image.url6.com',
        name: 'some name 6',
        url: 'http://some.url6.com',
      },
    ]

    tournament = mount(
      <Tournament
        tracks={tracks}
      />
    )
  })

  it('has the correct initial state', () => {
    expect(tournament.instance().state).toEqual({
      currentMatchupIndex: 0,
      currentRoundIndex: 0,
      winner: null,
    })
  })

  it('immediately declares winner if you pass a single track', () => {
    const tracks1 = [
      {
        artist: 'some artist',
        imageURL: 'http://image.url.com',
        name: 'some name',
        url: 'http://some.url.com',
      },
    ]
    const shortCircuitedTournament = mount(<Tournament tracks={tracks1} />)
    expect(
      shortCircuitedTournament.instance().state
    ).toEqual({
      currentMatchupIndex: 0,
      currentRoundIndex: 0,
      winner: tracks1[0],
    })
  })

  it('divides the passed in tracks into matchups', () => {
    expect(
      tournament.instance().matchups
    ).toEqual(
      [
        {
          tracks: [tracks[3], tracks[2]],
          winner: null,
        },
        {
          tracks: [tracks[1], tracks[0]],
          winner: null,
        },
      ]
    )
  })

  it('can declare a winner', () => {
    tournament.instance().declareWinner(tracks[1])
    expect(tournament.instance().state.winner).toEqual(tracks[1])
  })

  it('correctly plays a tournament', () => {
    tournament.instance().selectWinnerForCurrentMatchup(0)
    expect(tournament.instance().state).toEqual({
      currentMatchupIndex: 1,
      currentRoundIndex: 0,
      winner: null,
    })
    tournament.instance().selectWinnerForCurrentMatchup(1)
    expect(tournament.instance().state).toEqual({
      currentMatchupIndex: 0,
      currentRoundIndex: 1,
      winner: null,
    })
    tournament.instance().selectWinnerForCurrentMatchup(1)
    expect(tournament.instance().state).toEqual({
      currentMatchupIndex: 0,
      currentRoundIndex: 1,
      winner: tracks[3],
    })
  })

  it('passes selectWinnerForCurrentMatchup as onChooseContender', () => {
    const mockSelectWinner = jest.fn()
    tournament.instance().selectWinnerForCurrentMatchup = mockSelectWinner

    expect(mockSelectWinner).not.toHaveBeenCalled()
    tournament.find(Matchup).props().onChooseContender(1)
    expect(mockSelectWinner).toHaveBeenCalledTimes(1)
    expect(mockSelectWinner).toHaveBeenCalledWith(1)
  })
})
