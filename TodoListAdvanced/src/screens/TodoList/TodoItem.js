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

export default (props) => {
  
  const toggleTodo = () => {
    props.updateTodo(
      props.item.id,
      !props.item.completed
    )
  }

  const deleteTodo = () => {
    props.deleteTodo(props.item.id)
  }
  const item = props.item
  
  return (
    <TouchableOpacity 
      onPress={toggleTodo}
      style={[
          styles.itemButton,
          {
            height: props.height,
            marginRight: props.padding,
            marginLeft: props.padding
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
      <TouchableOpacity onPress={deleteTodo}>
        <Icon name="trash" style={{ color: 'red', paddingRight: 10 }} />
      </TouchableOpacity>
    </TouchableOpacity>
  )

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
