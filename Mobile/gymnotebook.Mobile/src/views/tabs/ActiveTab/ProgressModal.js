import React, { Component } from 'react';
import { View, Text, StyleSheet, CheckBox, Modal, TouchableOpacity } from 'react-native';
import { selectProgress, handleProgressModal } from '../../../store/progress/actions';
import { connect } from 'react-redux';
import { capFirst } from '../../../utils/string'
import progressConfig from '../../../config/progressConfig'

class ProgressModal extends Component {
  state = {
    modal: false,
    progress: [
      "weight",
      "biceps",
      "chest",
      "thigh",
      "calf",
      "waist",
      "shoulders",
      "neck"
    ],
    checked: null
  }

  componentDidMount() {
    this.setState({ checked: this.props.selectedProgress })
  }

  onCheck = (item) => {
    this.setState({ checked: item })
  }

  onSelect = () => {
    this.props.selectProgress(this.state.checked)
    this.props.handleProgressModal()
  }

  render() {

    const renderOptions = this.state.progress.map((item, i) => {
        return (
          <View key={i} style={{ flexDirection: 'column'}}>
            <View style={{ flexDirection: 'row' }}>
              <CheckBox
                value={this.state.checked === item ? true : false }
                onValueChange={() => this.onCheck(item)}
              />
              <Text style={{marginTop: 5}}>{progressConfig[item].label}</Text>
            </View>
          </View>
        )
      })
    
    return (
        <Modal 
          transparent={true}
          onRequestClose={() => {}}
          visible={this.props.modal}
          animationType={'fade'}
        >
          <View style={{ backgroundColor: 'rgba(0,0,0,0.6)', width: '100%', height: '100%'}}>
            <View style={styles.container}>
              <Text style={styles.title}>Select Progress</Text>
              <View>
                {renderOptions}
              </View>

              <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={this.props.handleProgressModal}>
                  <Text style={styles.buttonText}>Anuluj</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={this.onSelect}>
                  <Text style={styles.buttonText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

    );
  }
}

const styles = StyleSheet.create({
  container: { 
    borderRadius: 5,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 30,
    marginRight: 30,
    padding: 20,
    minWidth: 300,
    backgroundColor: 'white', 
    elevation: 50
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
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

const mapStateToProps = ({Progress}) => ({
  selectedProgress: Progress.selectedProgress,
  modal: Progress.modal
})

const mapDispatchToProps = (dispatch) => ({
  handleProgressModal: () => handleProgressModal()(dispatch),
  selectProgress: (progress) => selectProgress(progress)(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ProgressModal)