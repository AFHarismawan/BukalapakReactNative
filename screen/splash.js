import React, {Component} from 'react';
import {
    Text, View, AsyncStorage,
} from 'react-native';
import {user_id_key} from "../utils/constants"
import {styles} from '../utils/styles';
import {NavigationActions} from "react-navigation";

export class splash extends Component {

    replaceScreen = (name) => {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: name})
            ]
        });
        this.props.navigation.dispatch(resetAction);
    };

    render() {
        setTimeout(() => {
            AsyncStorage.getItem(user_id_key, (err, result) => {
                console.log(result);
                if (result !== null) {
                    this.replaceScreen('Home');
                } else {
                    this.replaceScreen('Login');
                }
            });
        }, 2000);
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Bukalapak
                </Text>
            </View>
        );
    }
}