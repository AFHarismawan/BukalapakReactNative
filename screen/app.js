import React from 'react';
import {
    AppRegistry, View,
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {splash} from './splash';
import {login} from './login';
import {home} from './home';
import {profile} from './profile';

const BukalapakApp = StackNavigator({
    Splash: {
        screen: splash,
        navigationOptions: {
            header: <View style={{display: 'none'}}/>,
        }
    },
    Login: {
        screen: login,
        navigationOptions: {
            title: 'Login',
        }
    },
    Home: {
        screen: home,
        navigationOptions: {
            title: 'Home',
        }
    },
    Profile: {
        screen: profile,
        navigationOptions: {
            title: 'Profile',
        }
    },
});

AppRegistry.registerComponent('BukalapakApp', () => BukalapakApp);