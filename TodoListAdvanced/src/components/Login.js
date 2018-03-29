import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  View
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


export default class Login extends Component {

  state = {
    username: '',
    password: ''
  }

  login = () => {
    this.props.login(this.state.username)
  }

  render() {
    return (
      <Container>
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

