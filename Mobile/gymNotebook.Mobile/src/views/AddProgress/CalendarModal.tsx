import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import {CalendarComponent} from '../../component'
import { selectDate, handleCalendarModal, pickDate } from '../../store/progress/actions'
import { connect } from 'react-redux'
import { Dispatch } from 'redux';
import { ApplicationState } from '../../store';

interface Props extends ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps> {
}

class CalendarModal extends Component<Props> {

  handleOk = () => {
    this.props.selectDate(this.props.pickedDate)
    this.props.handleCalendarModal()
  }

  handleCancel = () => {
    this.props.pickDate(this.props.selectedDate)
    this.props.handleCalendarModal()
  }

  render() {
    return (
      <Modal 
        transparent={true}
        onRequestClose={() => {}}
        visible={this.props.calendarModal}
        animationType={'fade'}
      >
        <View style={{ backgroundColor: 'rgba(0,0,0,0.6)', width: '100%', height: '100%'}}>
          <View style={styles.container}>

            <CalendarComponent />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={this.handleCancel}>
                <Text style={styles.buttonText}>Anuluj</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={this.handleOk}>
                <Text style={styles.buttonText}>OK</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: { 
    borderRadius: 5,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 10,
    marginRight: 10,
    padding: 20,
    minWidth: 300,
    backgroundColor: 'white', 
    elevation: 50
  },
  buttonContainer: { 
    marginLeft: 'auto',
    flexDirection: 'row'
  },
  button: {
    padding: 15,
  },
  buttonText: {
    fontSize: 13
  }
})

const mapStateToProps = ({Progress}: ApplicationState) => ({
  selectedDate: Progress.selectedDate,
  pickedDate: Progress.pickedDate,
  calendarModal: Progress.calendarModal
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  selectDate: (day: string) => selectDate(day)(dispatch),
  pickDate: (day: string) => pickDate(day)(dispatch),
  handleCalendarModal: () => handleCalendarModal()(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CalendarModal)