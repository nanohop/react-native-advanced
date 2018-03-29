import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  LayoutAnimation
} from 'react-native';

import { Icon } from 'native-base'

export default class TodoItem extends Component {

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
    const item = this.props.item
    return (
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
