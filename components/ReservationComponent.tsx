import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Switch, Button, Modal } from 'react-native';
import { Icon } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';


interface IReservationComponentState {
    guests: number | string,
    smoking: boolean,
    date: Date,
    showDatePicker: boolean,
    showModal: boolean
}

class ReservationComponent extends Component<{}, IReservationComponentState> {

    constructor(props: any) {
        super(props);
        this.state = {
            showModal: false,
            smoking: false,
            guests: 1,
            date: new Date(),
            showDatePicker: false
        }
    }


    render() {
        return (
            <ScrollView>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Guests</Text>
                    <Picker style={styles.formItem} selectedValue={this.state.guests} onValueChange={(value) => this.setState({ guests: value })}>
                        <Picker.Item label='1' value='1' />
                        <Picker.Item label='2' value='2' />
                        <Picker.Item label='3' value='3' />
                        <Picker.Item label='4' value='4' />
                        <Picker.Item label='5' value='5' />
                        <Picker.Item label='6' value='6' />
                    </Picker>
                </View>

                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Smoking/No-Smoking?</Text>
                    <Switch style={styles.formItem} value={this.state.smoking} onValueChange={(value) => this.setState({ smoking: value })} />
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date and Time</Text>
                    <Icon name='schedule' size={36} onPress={() => this.setState({ showDatePicker: true })} />
                    <Text style={{ marginLeft: 10 }}>{format(this.state.date, 'dd/MM/yyyy --- HH:mm')}</Text>
                    <DateTimePickerModal mode='datetime' isVisible={this.state.showDatePicker} isDarkModeEnabled={false}
                        onConfirm={(date) => this.setState({ date: date, showDatePicker: false })}
                        onCancel={() => this.setState({ showDatePicker: false })} />
                </View>
                <View style={styles.formRow}>
                    <Button title='Reserve' color='#7cc' onPress={() => this.handleReservation()} />
                </View>

                <Modal animationType='slide'
                    onRequestClose={() => this.setState({
                        showModal: true
                    })}
                    visible={this.state.showModal}
                >
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Your Reservation</Text>
                        <Text style={styles.modalText}>Number of Guests: {this.state.guests}</Text>
                        <Text style={styles.modalText}>Smoking?: {this.state.smoking ? 'Yes' : 'No'}</Text>
                        <Text style={styles.modalText}>Date and Time: {format(this.state.date, 'dd/MM/yyyy --- HH:mm')}</Text>
                        <Button title='Close' color='#7cc' onPress={() => { this.setState({ showModal: false }); this.resetForm(); }} />
                    </View>

                </Modal>



            </ScrollView>
        )
    }

    handleReservation() {
        // alert(JSON.stringify(this.state));
        this.setState({ showModal: true });
    }

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: new Date(),
            showDatePicker: false,
            showModal: false
        });
    }


}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#7cc',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});


export default ReservationComponent;