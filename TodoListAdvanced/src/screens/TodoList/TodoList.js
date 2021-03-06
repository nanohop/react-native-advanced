import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  StatusBar,
  ActivityIndicator,
  Image,
  Platform,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { 
  Button, 
  Text as NBText, 
  Segment,
  Icon
} from 'native-base'

import CheckImage from 'images/check.png'
import { items } from 'lib/api'

import TodoItem from './TodoItem'
import fadeout from 'components/shared/FadeOut'

import BounceIn from 'components/shared/BounceIn'
  
const FadeableTodoItem = fadeout(TodoItem)

import TodoHeader from './TodoHeader'

const FilterBar = ({ filter, changeFilter, children }) => {
  return (
    <View style={styles.contentHeader}>
      <Segment style={styles.segment}>
        {
          React.Children.map(children, (child, index) => {
            const text = child.props.children
            return (
              <Button 
                first={Platform.OS === 'ios' && index === 0}
                last={Platform.OS === 'ios' && index === children.length - 1}
                active={filter === text}
                onPress={() => changeFilter(text)}
              >
                {child}
              </Button>
            )
          })
        }
      </Segment>
    </View>
  )
}

export default class ToDoList extends Component {

  static navigationOptions = {
    header: null,
    tabBarIcon: ({ tintColor }) => (
      <Image 
        style={[styles.icon, { tintColor }]} 
        source={CheckImage} 
      />
    ),
    tabBarLabel: 'List'
  }
 
  state = {
    items: null,
    filter: 'All',
    counter: 0
  }

  incCounter = () => {
    this.setState({ counter: this.state.counter + 1 })
    setTimeout(this.incCounter, 500)
  }

  componentDidMount() {
    this.incCounter()
    items('GET')
    .then(items => {
      this.setState({ items })
    })
  }

  addItem = () => {
    this.props.navigation.navigate(
      'AddTodo',
      { saveItem: this.saveItem }
    )
  }

  saveItem = newTask => {
    items('POST', { task: newTask })
    .then(json => {
      this.setState({ items: json })
    })
  }

  updateTodo = (id, completed) => {
    items('PUT', { id, completed })
    .then(json => {
      this.setState({ items: json })
    })
  }

  deleteTodo = (id) => {
    const newItems = this.state.items.map(item => {
      if(item.id === id) {
        return {
          ...item,
          deleted: true
        }
      } else {
        return item
      }
    })
    this.setState({ items: newItems })
  }

  deleteTodoAPI = (id) => {
    items('DELETE', { id })
    .then(json => {
      this.setState({ items: json })
    })
  }

  filteredItems = () => {
    if(this.state.filter === 'Todo') {
      return this.state.items.filter(i => {
        return !i.completed
      })
    }
    if(this.state.filter === 'Complete') {
      return this.state.items.filter(i => {
        return i.completed
      })
    }

    return this.state.items
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        
        <TodoHeader logout={this.props.screenProps.logout} />

        <View style={styles.contentWrapper}>

          <FilterBar 
            filter={this.state.filter}
            changeFilter={filter => {
              this.setState({ filter })
            }}
          >
            <NBText>All</NBText>
            <NBText>Todo</NBText>
            <NBText>Complete</NBText>
          </FilterBar>

          {
            !this.state.items && <ActivityIndicator 
              size="large"
              color="#2288ee"
              style={{ marginTop: 20 }}
            />
          }

          <FlatList 
            data={this.filteredItems()}
            style={styles.content}
            renderItem={row => {
              return <BounceIn 
                render={({ height, padding }) => {
                  return <FadeableTodoItem 
                    item={row.item} 
                    height={height}
                    padding={padding}
                    updateTodo={this.updateTodo}
                    deleteTodo={this.deleteTodo}
                    fade={row.item.deleted}
                    afterFade={() => {
                      this.deleteTodoAPI(row.item.id)
                    }}
                  />
                }}
              />
            }}
            keyExtractor={item => item.id.toString()}
          />

          <View style={styles.contentFooter}>
            <Button onPress={this.addItem}>
              <NBText>Add Todo</NBText>
            </Button>
          </View>

        </View>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  segment: {
    flex: 1, 
    padding: 5
  },
  item: {
    padding: 10
  },
  content: {
    flex: 1,
    alignSelf: 'stretch'
  },
  contentWrapper: {
    flex: 1
  },
  contentHeader: {
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#aaa',
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentFooter: {
    padding: 20,
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  icon: {
    height: 24,
    resizeMode: 'contain'
  }
});
