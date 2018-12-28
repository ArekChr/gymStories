import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import CalendarComponent from '../../component/CalendarComponent'
import { selectDate, handleCalendarModal, pickDate } from '../../store/progress/actions'
import { connect } from 'react-redux'

class CalendarModal extends Component {

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

const mapStateToProps = ({progress}) => ({
  selectedDate: progress.selectedDate,
  pickedDate: progress.pickedDate,
  calendarModal: progress.calendarModal
})

const mapDispatchToProps = (dispatch) => ({
  selectDate: (day) => selectDate(day)(dispatch),
  pickDate: (day) => pickDate(day)(dispatch),
  handleCalendarModal: () => handleCalendarModal()(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CalendarModal)