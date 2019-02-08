import React, { Component } from 'react';
import { Calendar } from 'react-native-calendars'
import { connect } from 'react-redux';
import { pickDate } from '../store/progress/actions'
import { Dispatch } from 'redux';

interface Props {
  selectedDate: string
  pickDate: (day: any) => Function
  pickedDate: any
}

class CalendarComponent extends Component<Props, any> {

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

const mapStateToProps = ({Progress}: any) => ({
  selectedDate: Progress.selectedDate,
  pickedDate: Progress.pickedDate
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  pickDate: (day: any) => pickDate(day)(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CalendarComponent)