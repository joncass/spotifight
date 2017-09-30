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
            onChoose={() => this.onChooseContender(this.firstContender)}
            track={this.firstContender}
          />
        </Segment>
        <Segment>
          <Contender
            onChoose={() => this.onChooseContender(this.secondContender)}
            track={this.secondContender}
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
