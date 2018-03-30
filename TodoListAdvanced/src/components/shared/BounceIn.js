import React from 'react'

import { LayoutAnimation } from 'react-native'

export default class BounceIn extends React.Component {
  state = {
    height: 40,
    padding: 100
  }

  componentDidMount() {

    requestAnimationFrame(() => {
      LayoutAnimation.spring()
      this.setState({
        height: 60,
        padding: 0
      })
    })
  }

  render() {
    return this.props.render({
      height: this.state.height,
      padding: this.state.padding
    })
  }

}
