
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';


class Name extends Component {
    state = {
        name: '',
    };

    render() {
        return (
            <View>
                <Text>
                     Enter your name:
                </Text>
                <TextInput
                    placeholder='name'
                    onChangeText={
                        (text) => {
                            this.setState({
                                name: text,
                            });
                        }
                    }
                value={this.state.name}
                />
                <TouchableOpacity
                    onPress={() => {
                        Actions.chat({
                            names: this.state.name
                        });
                    }}
                >
                < Text > go to chat page </Text>
                </TouchableOpacity>
            </View>
        );
    }
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


export default Name;
