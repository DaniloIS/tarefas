import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
  },

  header: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10
  },

  addTask: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  }
})