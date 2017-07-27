import React, {Component} from 'react';
import {
    TouchableWithoutFeedback,
    Text, TextInput,
    View, ActivityIndicator, AsyncStorage,
} from 'react-native';
import {Buffer} from 'buffer';
import {user_id_key, token_key} from '../utils/constants';
import {styles} from '../utils/styles';
import {NavigationActions} from 'react-navigation';

export class login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoading: false
        };
    }

    replaceScreen = (name) => {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: name})
            ]
        });
        this.props.navigation.dispatch(resetAction);
    };

    async setCache(responseJson) {
        try {
            await AsyncStorage.setItem(user_id_key, responseJson.user_id.toString());
            await AsyncStorage.setItem(token_key, responseJson.token);
        } catch (error) {
            console.error(error);
        }
        this.setState({isLoading: false});
        this.replaceScreen('Home');
    }

    login() {
        this.setState({isLoading: true});
        fetch('https://api.bukalapak.com/v2/authenticate.json', {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + new Buffer(this.state.email + ':' + this.state.password).toString('base64'),
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setCache(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator/>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Bukalapak
                </Text>
                <TextInput
                    style={styles.form}
                    placeholder="Email"
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onChangeText={(email) => this.setState({email})}
                />
                <TextInput
                    style={styles.form}
                    placeholder="Password"
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({password})}
                />

                <TouchableWithoutFeedback
                    onPress={this.login.bind(this)}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>SIGN IN</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}