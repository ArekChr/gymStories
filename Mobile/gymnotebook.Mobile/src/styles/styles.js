import { StyleSheet } from 'react-native'
import { COLOR_PRIMARY, COLOR_SECONDARY, FONT_COLOR, HEADER_COLOR } from './common'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    backgroundColor: COLOR_SECONDARY,
    flex: 1,
    justifyContent: 'flex-start'
  },
  trainingButton: {
    backgroundColor: 'white',
    borderRadius: 5,
    height: 50,
    marginBottom: 5,
    justifyContent: 'center'
  },
  title: {
    textAlignVertical: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
  },
  inputBox: {
    height: 50,
    backgroundColor: COLOR_PRIMARY,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 6,
    fontSize: 20,
    justifyContent: 'center',
    color: FONT_COLOR
  },
  inputBoxMultiline: {
    minHeight: 50,
    maxHeight: 150,
    backgroundColor: COLOR_PRIMARY,
    borderRadius: 10,
    paddingHorizontal: 6,
    marginVertical: 10,
    fontSize: 20,
    justifyContent: 'center',
    color: FONT_COLOR
  }
})