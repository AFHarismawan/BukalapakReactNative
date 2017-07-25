import React, {Component} from 'react';
import {
    Text, View, ActivityIndicator, AsyncStorage, TouchableWithoutFeedback,
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {user_id_key, token_key} from '../utils/constants'
import {styles} from '../utils/styles'

export class home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id: '',
            token: '',
            isLoading: true
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

    async getCache() {
        try{
            await AsyncStorage.multiGet([user_id_key, token_key], (err, stores) => {
                this.setState({
                    user_id: stores[0][1],
                    token: stores[1][1]
                });
            });
            this.setState({isLoading: false});
        }
        catch(error){
            console.error(error);
        }
    }

    async logout() {
        this.setState({isLoading: true});
        try {
            await AsyncStorage.setItem(user_id_key, '');
            await AsyncStorage.setItem(token_key, '');
        } catch (error) {
            console.error(error);
        }
        this.setState({isLoading: false});
        this.replaceScreen('Login')
    }

    componentDidMount() {
        this.getCache();
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator/>
                </View>
            );
        }
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Welcome {this.state.user_id + ' ' + this.state.token}!
                </Text>
                <TouchableWithoutFeedback
                    onPress={() => {navigate('Profile')}}>
                    <View style={styles.button}>
                        <Text style={styles.text}>SHOW PROFILE</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    onPress={this.logout.bind(this)}>
                    <View style={styles.button}>
                        <Text style={styles.text}>SIGN OUT</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}