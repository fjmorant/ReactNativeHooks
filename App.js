import React, {useState, useEffect} from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  NetInfo,
} from 'react-native'

type Props = {}

const FormHook = () => {
  const [formState, setForm] = useState({email: '', name: '', isOnline: true})

  const handleFirstConnectivityChange = connectionInfo => {
    setForm({...formState, isOnline: connectionInfo.type !== 'none'})
  }

  useEffect(() => {
    NetInfo.addEventListener('connectionChange', handleFirstConnectivityChange)

    return () => {
      NetInfo.removeEventListener(
        'connectionChange',
        handleFirstConnectivityChange
      )
    }
  })

  return (
    <View style={styles.container}>
      <Text style={styles.count}>Name</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          width: 200,
          padding: 7,
        }}
        onChangeText={name => setForm({...formState, name})}
        value={formState.name}
      />
      <Text style={styles.count}>Email</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          width: 200,
          padding: 7,
        }}
        onChangeText={email => setForm({...formState, email})}
        value={formState.email}
      />
      <Button
        disabled={!formState.isOnline}
        onPress={() => setForm({email: '', name: ''})}
        title="Send"
      />
    </View>
  )
}

export default FormHook

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  count: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
})
