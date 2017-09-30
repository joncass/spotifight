import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Segment,
} from 'semantic-ui-react'

import Contender from './Contender'

class Matchup extends Component {
  constructor(props) {
    super(props)
    this.onChooseContender = this.props.onChooseContender
    this.firstContender = this.props.contenders[0]
    this.secondContender = this.props.contenders[1]
  }

  render() {
    return (
      <Segment.Group horizontal>
        <Segment>
          <Contender
            ref="firstContender"
            track={this.firstContender}
            onChoose={() => this.onChooseContender(0)}
            onPlay={() => this.refs.secondContender.pause()}
          />
        </Segment>
        <Segment>
          <Contender
            ref="secondContender"
            track={this.secondContender}
            onChoose={() => this.onChooseContender(1)}
            onPlay={() => this.refs.firstContender.pause()}
          />
        </Segment>
      </Segment.Group>
    )
  }
}

Matchup.propTypes = {
  onChooseContender: PropTypes.func.isRequired,
  contenders: PropTypes.arrayOf(
    PropTypes.shape({
      artist: PropTypes.string.isRequired,
      imageURL: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

export default Matchup
