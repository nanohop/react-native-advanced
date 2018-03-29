import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  LayoutAnimation,
  Animated
} from 'react-native';

import { Icon } from 'native-base'

export default class TodoItem extends Component {

  state = {
    height: 40,
    padding: 100
  }

  componentDidMount() {
    this.visible = new Animated.Value(100)

    requestAnimationFrame(() => {
      LayoutAnimation.spring()
      this.setState({
        height: 60,
        padding: 0
      })
    })
  }

  componentDidUpdate(prevProps) {
    if(this.props.item.deleted && !prevProps.item.deleted) {
      
      Animated.timing(
        this.visible,
        {
          toValue: 0,
          duration: 250
        }
      ).start(e => {
        this.props.deleteTodoAPI(this.props.item.id)
      })

    }
  }

  toggleTodo = () => {
    this.props.updateTodo(
      this.props.item.id,
      !this.props.item.completed
    )
  }

  deleteTodo = () => {
    this.props.deleteTodo(this.props.item.id)
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

    const item = this.props.item
    return (
      <Animated.View
        style={{
          opacity,
          left,
          height
        }}
      >
        <TouchableOpacity 
          onPress={this.toggleTodo}
          style={[
              styles.itemButton,
              {
                height: this.state.height,
                marginRight: this.state.padding,
                marginLeft: this.state.padding
              }
            ]}
        >
          <Icon name={item.completed ? 'checkmark-circle' : 'radio-button-off'} />
          <Text style={[styles.item, {
            opacity: (item.completed ? 0.5 : 1.0),
            textDecorationLine: (item.completed ? 'line-through' : 'none')
          }]}>
            {item.task}
          </Text>
          <TouchableOpacity onPress={this.deleteTodo}>
            <Icon name="trash" style={{ color: 'red', paddingRight: 10 }} />
          </TouchableOpacity>
        </TouchableOpacity>
      </Animated.View>
    )
  }

}

const styles = StyleSheet.create({
  item: {
    padding: 20,
    flex: 1
  },
  itemButton: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10
  }
});
