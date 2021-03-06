import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  List,
} from 'semantic-ui-react'

import Contender from './Contender'

class Matchup extends Component {
  constructor(props) {
    super(props)

    this.onChooseContender = this.props.onChooseContender
    this.state = {
      firstContender: this.props.contenders[0],
      secondContender: this.props.contenders[1],
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      firstContender: nextProps.contenders[0],
      secondContender: nextProps.contenders[1],
    })
  }

  render() {
    return (
      <List horizontal>
        <List.Item>
          <Contender
            ref="firstContender"
            track={this.state.firstContender}
            onChoose={() => this.onChooseContender(0)}
            onPlay={() => this.refs.secondContender.pause()}
          />
        </List.Item>
        <List.Item>
          <Contender
            ref="secondContender"
            track={this.state.secondContender}
            onChoose={() => this.onChooseContender(1)}
            onPlay={() => this.refs.firstContender.pause()}
          />
        </List.Item>
      </List>
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
