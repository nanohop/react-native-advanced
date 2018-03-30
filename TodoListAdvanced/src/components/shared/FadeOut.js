import React from 'react'

import {
  Animated
} from 'react-native'

export default (InputComponent) => {
  return class extends React.Component {
    componentDidMount() {
      this.visible = new Animated.Value(100)
    }

    componentDidUpdate(prevProps) {
      if(this.props.fade && !prevProps.fade) {
        
        Animated.timing(
          this.visible,
          {
            toValue: 0,
            duration: 250
          }
        ).start(e => {
          this.props.afterFade()
        })

      }
    }

    render() {
      const opacity = this.visible && this.visible.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 1],
      })

      const left = this.visible && this.visible.interpolate({
        inputRange: [0, 100],
        outputRange: [-200, 0],
      })

      const height = this.visible && this.visible.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 60],
      })

      return (
        <Animated.View
          style={{
            opacity,
            left,
            height
          }}
        >
          <InputComponent {...this.props} />
        </Animated.View>
      )
    }
  }
}