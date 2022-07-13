import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Button } from '../Button'

import styles from './styles';

const TaskList = ({ data, handleEdit, handleDelete }) => {

  return (
    <View style={styles.container}>
      <Text>{data.name}</Text>
      <View style={styles.btns}>
        <Button bgColor='#48D1CC' size={[36, 36]} label={<Feather name="edit-2" size={18} color="white" />} onClick={() => handleEdit(data)} />
        <Button bgColor='#D42B15' size={[36, 36]} label={<Feather name="trash-2" size={18} color="white" />} onClick={() => handleDelete(data.key)} />
      </View>
    </View>
  )
}

export { TaskList };