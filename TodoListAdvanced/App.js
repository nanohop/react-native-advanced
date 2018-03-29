
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

console.disableYellowBox = true;

import { TabNavigator, StackNavigator } from 'react-navigation'

import ToDoList from './src/components/TodoList'
import About from './src/components/About'
import AddTodo from './src/components/AddTodo'
import Login from './src/components/Login'

const TodoNav = StackNavigator({
  TodoList: { screen: ToDoList },
  AddTodo: { screen: AddTodo }
}, {
  mode: 'modal'
})

const TabNav = TabNavigator({
  TodoNav: { screen: TodoNav },
  About: { screen: About },
}, {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: '#0066cc'
  },
  ...TabNavigator.Presets.iOSBottomTabs
})

type Props = {};
export default class App extends Component<Props> {

  state = {
    username: null
  }

  login = (username) => {
    this.setState({ username })
  }

  render() {
    if(this.state.username !== null) {
      return <TabNav />
    } else {
      return <Login login={this.login} />
    }
  }
}

const styles = StyleSheet.create({

});
