import React from 'react'

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import {
  Icon
} from 'native-base'

import * as colors from '../../theme/colors'


const TodoHeader = ({ logout }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>
        Todo List
      </Text>
      <TouchableOpacity onPress={
        logout
      }>
        <Icon name="exit" style={styles.logoutIcon} />
      </TouchableOpacity>
    </View>
  )
}

export default TodoHeader

const styles = StyleSheet.create({
  header: {
    padding: 10,
    paddingTop: 20,
    alignSelf: 'stretch',
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderBottomWidth: 1,
    borderColor: '#0066cc',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#ffffff',
    flex: 1,
    marginLeft: 30
  },
  logoutIcon: {
    color: '#fff',
    width: 30
  },
})
