import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import firebase from '../../services/firebaseConnection';

import { Input } from '../Input';
import { Button } from '../Button';

import styles from './styles';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [type, setType] = useState('login')

  async function handleSubmit() {
    if(type === 'login') {
      await firebase.auth().signInWithEmailAndPassword(form.email, form.password).then(res => {
        AsyncStorage.setItem('userUid', res.user.uid);
      }).catch(err => {
        console.log(err)
        return
      })
    } else {
      await firebase.auth().createUserWithEmailAndPassword(form.email, form.password).then(res => {
        AsyncStorage.setItem('userUid', res.user.uid);
      }).catch(err => {
        console.log(err)
        return
      })
    }
  }

  return (
    <View style={styles.form}>
      <Input placeholder='exemplo@email.com' value={form.email} onChange={e => setForm({ ...form, email: e})} />
      <Input placeholder='*******' value={form.password} onChange={e => setForm({ ...form, password: e})} />
      <Button label={type === 'login' ? 'Acessar' : 'Cadastrar'} onClick={handleSubmit} />
      <TouchableOpacity onPress={() => type === 'login' ? setType('cadastrar') : setType('login')}>
        <Text>{type === 'login' ? 'Criar um conta' : 'Já possuo uma conta'}</Text>
      </TouchableOpacity>
    </View>
  )
}

export { Login };