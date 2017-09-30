import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Contender from './Contender'
import Matchup from './Matchup'

Enzyme.configure({ adapter: new Adapter() })

describe('Matchup', () => {
  let matchup, contenders, onChooseContender

  beforeEach(() => {
    contenders = [
      {
        artist: 'some artist',
        imageURL: 'http://image.url.com',
        name: 'some name',
        url: 'http://some.url.com',
      },
      {
        artist: 'some other artist',
        imageURL: 'http://image.otherurl.com',
        name: 'some other name',
        url: 'http://some.otherurl.com',
      },
    ]

    onChooseContender = jest.fn()

    matchup = shallow(
      <Matchup
        onChooseContender={onChooseContender}
        contenders={contenders}
      />
    )
  })

  it('renders two Contenders', () => {
    const contenderComps = matchup.find(Contender)
    expect(contenderComps).toHaveLength(2)
  })

  it('passes the first track to the first Contender', () => {
    const firstContender = matchup.find(Contender).first()
    expect(firstContender.props().track).toEqual(contenders[0])
  })

  it('passes the second track to the second Contender', () => {
    const secondContender = matchup.find(Contender).last()
    expect(secondContender.props().track).toEqual(contenders[1])
  })

  it('passes onChoose prop to firstContender appropriately', () => {
    const firstContender = matchup.find(Contender).first()

    expect(onChooseContender).not.toHaveBeenCalled()
    firstContender.props().onChoose()
    expect(onChooseContender).toHaveBeenCalledTimes(1)
    expect(onChooseContender).toHaveBeenCalledWith(contenders[0])
  })

  it('passes onChoose prop to secondContender appropriately', () => {
    const secondContender = matchup.find(Contender).last()

    expect(onChooseContender).not.toHaveBeenCalled()
    secondContender.props().onChoose()
    expect(onChooseContender).toHaveBeenCalledTimes(1)
    expect(onChooseContender).toHaveBeenCalledWith(contenders[1])
  })
})
