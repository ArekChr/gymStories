import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import CalendarModal from './CalendarModal'
import { handleCalendarModal } from '../../store/progress/actions';
import { connect } from 'react-redux';
import { capFirst } from '../../utils/string'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

class AddProgressScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Dodaj ',
      headerRight: (
        <TouchableOpacity style={{padding: 10}} onPress={navigation.getParam('onProgressAdd')}>
          <MaterialIcons name="check" size={25} color='white' /> 
        </TouchableOpacity>
      )
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ onProgressAdd: this._onProgressAdd})
  }

  _onProgressAdd = () => {
  }

  handleInput = () => {

  }

  render() {
    return (
      <View>
        <CalendarModal ref="modal"/>
        <View style={styles.item}>
          <Text style={styles.text}>{capFirst(this.props.selectedProgress)}</Text>
          <TextInput 
            style={styles.input} 
            keyboardType={'numeric'}
             
            autoFocus={true}
            defaultValue={`${this.props.lastProgress}`} 
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.text}>Data</Text>
          <TouchableOpacity style={styles.input} onPress={() => this.props.handleCalendarModal()}>
            <Text>{this.props.selectedDate}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderBottomWidth: 1, 
    borderBottomColor: 'rgba(0,0,0,0.2)',
    height: 60
  },
  text: { 
    paddingLeft: 10 
  },
  input: { 
    paddingRight: 10, 
    marginLeft: 'auto'
  }
})

const mapStateToProps = ({progress}) => ({
  selectedDate: progress.selectedDate,
  selectedProgress: progress.selectedProgress,
  lastProgress: progress.lastProgress
})

const mapDispatchToProps = (dispatch) => ({
  handleCalendarModal: () => handleCalendarModal()(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AddProgressScreen)