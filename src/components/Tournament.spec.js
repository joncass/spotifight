import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Tournament from './Tournament'

Enzyme.configure({ adapter: new Adapter() })

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
    ]

    tournament = mount(
      <Tournament
        tracks={tracks}
      />
    )
  })

  it('throws error if you pass one track', () => {
    const tracks1 = [
      {
        artist: 'some artist',
        imageURL: 'http://image.url.com',
        name: 'some name',
        url: 'http://some.url.com',
      },
    ]
    expect(() => shallow(<Tournament tracks={tracks1} />)).toThrow()
  })

  it('throws error if you pass three tracks', () => {
    const tracks3 = [
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
    ]
    expect(() => shallow(<Tournament tracks={tracks3} />)).toThrow()
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

  it('has the correct initial state', () => {
    expect(tournament.instance().state).toEqual({
      currentMatchupIndex: 0,
      currentRoundIndex: 0,
    })
  })

})
