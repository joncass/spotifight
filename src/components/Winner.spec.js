import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Winner from './Winner'
import TrackInfo from './TrackInfo'
import TrackPlayer from './TrackPlayer'

Enzyme.configure({ adapter: new Adapter() })

describe('Winner', () => {
  let winnerComponent, track

  beforeEach(() => {
    track = {
      artist: 'some artist',
      imageURL: 'http://image.url.com',
      name: 'some name',
      url: 'http://some.url.com',
    }

    winnerComponent = mount(
      <Winner
        track={track}
      />
    )
  })

  it('renders a TrackInfo', () => {
    const trackInfo = winnerComponent.find(TrackInfo)
    expect(trackInfo.props().track).toEqual(track)
  })

  it('renders a TrackPlayer', () => {
    const trackPlayer = winnerComponent.find(TrackPlayer)
    expect(trackPlayer.props().track).toEqual(track)
  })
})
