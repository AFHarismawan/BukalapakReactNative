import React, {Component} from 'react';
import {
    Text, View, AsyncStorage, ActivityIndicator,
} from 'react-native';
import {Buffer} from 'buffer';
import {user_id_key, token_key} from '../utils/constants'
import {styles} from '../utils/styles'

export class profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id: '',
            token: '',
            isLoading: true,
            name: '',
            email: '',
            avatar: ''
        };
    }

    async getCache() {
        try{
            await AsyncStorage.multiGet([user_id_key, token_key], (err, stores) => {
                this.setState({
                    user_id: stores[0][1],
                    token: stores[1][1]
                });
            });
        }
        catch(error){
            console.error(error);
        }
        this.getData();
    }

    getData = () => {
        fetch('https://api.bukalapak.com/v2/users/info.json', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + new Buffer(this.state.user_id + ':' + this.state.token).toString('base64'),
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setProfile(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    setProfile = (responseJson) => {
        console.log(responseJson);
        this.setState({
            name: responseJson.user.name,
            email: responseJson.user.email,
            avatar: responseJson.user.avatar,
            isLoading: false
        });
        console.log(this.state.name, this.state.email, this.state.avatar);
    };

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
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Bukalapak
                </Text>
            </View>
        );
    }
}