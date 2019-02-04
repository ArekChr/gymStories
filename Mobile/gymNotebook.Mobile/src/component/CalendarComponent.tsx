import React, { Component } from 'react';
import { Calendar } from 'react-native-calendars'
import { connect } from 'react-redux';
import { pickDate } from '../store/progress/actions'

class CalendarComponent extends Component {

  componentDidMount(){
    this.setState({ selected: this.props.selectedDate})
  }

  render() {
    return (
        <Calendar
          current={new Date().toISOString().substring(0,10)}
          minDate={'2014-01-01'}
          maxDate={new Date().toISOString().substring(0,10)}
          firstDay={1}
          onDayPress={(day) => this.props.pickDate(day.dateString)}
          markedDates={{
            [this.props.pickedDate]: {selected: true},
          }}
          hideArrows={false}
        />
    );
  }
}

const mapStateToProps = ({Progress}) => ({
  selectedDate: Progress.selectedDate,
  pickedDate: Progress.pickedDate
})

const mapDispatchToProps = (dispatch) => ({
  pickDate: (day) => pickDate(day)(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CalendarComponent)