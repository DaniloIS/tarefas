import React, { useState, useEffect } from 'react'
import { SafeAreaView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { Login } from './src/components/Login';
import { Task } from './src/components/Task';

import styles from './styles';

export default function App() {
  const [userUid, setUserUid] = useState('')
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('userUid').then(res => {
      if (res) {
        console.log(res)
        setUserUid(res)
        setLoading(false)
      }
    })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      {loading ? 
        <ActivityIndicator color='#121212' size={45} />
        :
        userUid ? <Task /> : <Login />
      }
    </SafeAreaView>
  );
}