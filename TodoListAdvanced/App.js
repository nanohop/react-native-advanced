
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';

console.disableYellowBox = true;

import { TabNavigator, StackNavigator } from 'react-navigation'

import ToDoList from './src/screens/TodoList/TodoList'
import About from './src/screens/About/About'
import AddTodo from './src/screens/AddTodo/AddTodo'
import Login from './src/screens/Login/Login'

const TodoNav = StackNavigator({
  TodoList: { screen: ToDoList },
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

const RootNav = StackNavigator({
  TabNav: { screen: TabNav },
  AddTodo: { screen: AddTodo },
}, {
  mode: 'modal'
})

type Props = {};
export default class App extends Component<Props> {

  state = {
    username: null
  }

  login = (username) => {
    this.setState({ username })
  }

  logout = () => {
    AsyncStorage.setItem('@TodoListAdvanced:username', '').then(() => {
      this.setState({ username: null })
    })
  }

  render() {
    if(this.state.username !== null) {
      return <RootNav screenProps={{ logout: this.logout }} />
    } else {
      return <Login login={this.login} />
    }
  }
}

const styles = StyleSheet.create({

});
