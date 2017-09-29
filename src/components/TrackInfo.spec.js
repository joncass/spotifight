import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

import {
  Container,
  Header,
  Image,
} from 'semantic-ui-react'

import TrackInfo from './TrackInfo'

describe('TrackInfo', () => {
  let trackInfo, track

  beforeEach(() => {
    track = {
      artist: 'some artist',
      imageURL: 'http://image.url.com',
      name: 'some name',
      url: 'http://some.url.com',
    }

    trackInfo = mount(
      <TrackInfo
        track={track}
      />
    )
  })

  it('has a trackInfoText helper', () => {
    expect(trackInfo.instance().trackInfoText()).toMatch(track.artist)
    expect(trackInfo.instance().trackInfoText()).toMatch(track.name)
  })

  it('renders an Image with the imageURL', () => {
    const trackImage = trackInfo.find(Image)
    expect(trackImage).toHaveLength(1)
    expect(trackImage.props().src).toBe(track.imageURL)
  })

  it('renders a Header with the trackInfoText', () => {
    const trackHeader = trackInfo.find(Header)
    expect(trackHeader).toHaveLength(1)
    expect(trackHeader.text()).toBe(trackInfo.instance().trackInfoText())
  })
})
