import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import {
  Button,
} from 'semantic-ui-react'

import Contender from './Contender'
import TrackPlayer from './TrackPlayer'

Enzyme.configure({ adapter: new Adapter() })

describe('Contender', () => {
  let contender, track, onChoose

  beforeEach(() => {
    track = {
      artist: 'some artist',
      imageURL: 'http://image.url.com',
      name: 'some name',
      url: 'http://some.url.com',
    }

    onChoose = jest.fn()

    contender = shallow(
      <Contender
        onChoose={onChoose}
        track={track}
      />
    )
  })

  it('renders a TrackPlayer', () => {
    const trackPlayer = contender.find(TrackPlayer)
    expect(trackPlayer.props().track).toEqual(track)
  })

  it('renders a Button that calls onChoose when clicked', () => {
    const heartButton = contender.find(Button)

    expect(onChoose).not.toHaveBeenCalled()
    heartButton.simulate('click')
    expect(onChoose).toHaveBeenCalledTimes(1)
  })
})
