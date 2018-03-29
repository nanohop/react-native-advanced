import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  View,
  Image,
  Dimensions
} from 'react-native'

import { 
  Container, 
  Content, 
  Form, 
  Item, 
  Input,
  Button,
  Text
} from 'native-base'

import LoginImage from '../images/todo_icon.png'

export default class Login extends Component {

  state = {
    username: '',
    password: '',
    width: 0
  }

  login = () => {
    this.props.login(this.state.username)
  }

  render() {
    return (
      <Container>
        <View 
          style={styles.logoContainer}
          onLayout={event => {
            this.setState({
              width: event.nativeEvent.layout.width
            })
          }}
        >
          <Image 
            source={LoginImage} 
            resizeMode="contain"
            style={{
              width: this.state.width / 2.0,
              height: this.state.width / 2.0,
              maxHeight: 200,
              maxWidth: 200
            }}
          />
        </View>

        <View style={{ padding: 20 }} >
          <Item style={{ marginRight: 5 }}>
            <Input 
              placeholder="Username" 
              value={this.state.username}
              onChangeText={text => {
                this.setState({ username: text })
              }}
            />
          </Item>
          <Item style={{ marginRight: 5 }}>
            <Input 
              placeholder="Password" 
              value={this.state.password}
              secureTextEntry
              onChangeText={text => {
                this.setState({ password: text })
              }}
            />
          </Item>

          <Button 
            block 
            style={{ marginTop: 80 }}
            onPress={this.login}
          >
            <Text>Login</Text>
          </Button>


        </View>
      </Container>
    )
  }

}

const styles = StyleSheet.create({
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20
  }
})
