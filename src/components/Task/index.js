import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, Keyboard, ActivityIndicator, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Feather } from '@expo/vector-icons';

import firebase from '../../services/firebaseConnection';

import { Button } from '../Button';
import { Input } from '../Input';
import { TaskList } from '../TaskList';

import styles from './styles';

const Task = () => {
  const inputRef = useRef(null);
  const [task, setTask] = useState('');
  const [key, setKey] = useState('');
  const [tasks, setTasks] = useState([]);
  const [userUid, setUserUid] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('userUid').then(res => {
      if (res) {
        setUserUid(res)
        firebase.database().ref('tasks').child(res).once('value', (snapshot) => {
          snapshot.forEach((childItem) => {
            let data = {
              key: childItem.key,
              name: childItem.val().name
            }

            setTasks(oldTasks => [...oldTasks, data])
          })

        setLoading(false)
        })
      }
    })
  }, [])

  function handleAddTask() {
    if (!task) return
    if (!userUid) return

    if (key) {
      firebase.database().ref('tasks').child(userUid).child(key).update({
        name: task
      })
      .then(res => {
        const taskIndex = tasks.findIndex(item => item.key === key)
        const tasksClone = tasks;
        tasksClone[taskIndex].name = task

        setTasks([...tasksClone])
      })

      Keyboard.dismiss();
      setKey('')
      setTask('')
      return
    }
    
    let t = firebase.database().ref('tasks').child(userUid)
    let k = t.push().key

    t.child(k).set({
      name: task
    })
    .then(res => {
      const data = {
        key: k,
        name: task
      }

      setTasks(oldTasks => [...oldTasks, data])
    })

    Keyboard.dismiss();
    setTask('')
    return
  }

  function handleEdit(data) {
    setKey(data.key)
    setTask(data.name)
    inputRef.current.focus()
  }

  function handleDelete(key) {
    firebase.database().ref('tasks').child(userUid).child(key).remove()
    .then(res => {
      const findTasks = tasks.filter(item => item.key !== key)
      setTasks(findTasks)
    })
  }

  function cancelEdit() {
    setKey('')
    setTask('')
    Keyboard.dismiss()
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 50}}>Tarefas</Text>
      </View>
      <View>
        {key && <TouchableOpacity onPress={cancelEdit} style={{ flexDirection: 'row' }}><Feather name="x-circle" size={12} color="#D42B15" /><Text style={{ color: '#D42B15' }}> Você está editando uma tarefa!</Text></TouchableOpacity>}
      </View>
      <View style={styles.addTask}>
        <Input placeholder='O que vai fazer hoje?' size={['85%', 36]} value={task} onChange={e => setTask(e)} inputRef={inputRef} />
        <Button label='+' size={[36, 36]} onClick={handleAddTask} />
      </View>
      <View>
        {loading ? 
          <ActivityIndicator color='#121212' size={45} />
          :
          <FlatList
            data={tasks}
            keyExtractor={item => item.key}
            renderItem={({item}) => <TaskList data={item} handleEdit={handleEdit} handleDelete={handleDelete} />}
          />
        }
      </View>
    </View>
  )
}

export { Task };