import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';

import AboutImage from 'images/star.png'

export default class About extends Component {

  static navigationOptions = {
    header: null,
    tabBarIcon: ({ tintColor }) => (
      <Image 
        style={[styles.icon, { tintColor }]} 
        source={AboutImage} 
      />
    ),
    tabBarLabel: 'About'
  }
  render() {
    return (
      <View style={{flex: 1}}>

        <Text style={styles.header}>
          About
        </Text>

        <Text style={styles.text}>
          About Page
        </Text>



      </View>
    )
  }

}

const styles = StyleSheet.create({
  icon: {
    height: 24,
    resizeMode: 'contain'
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    padding: 20
  },
  text: {
    fontSize: 16,
    padding: 10,
    marginRight: 20,
    marginLeft: 20,
  }
})
