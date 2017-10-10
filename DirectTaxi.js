import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Slider,
    TouchableOpacity,
    Alert,
    AsyncStorage,
    Image,
} from 'react-native';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';


class DirectTaxi extends Component {

    constructor(props) {
        super(props);
        this.state = {
          moneyIndex: 0,
          curMoney: 0,
        }
        AsyncStorage.getItem('moneyIndex').then((value) => {
            this.setState({ moneyIndex: value });
            console.log(this.state.moneyIndex);
        });
        AsyncStorage.getItem('curMoney').then((value) => {
            this.setState({ curMoney: value });
            console.log(this.state.curMoney);
        });
    }

    render() {
        return (
          <View style={{flex: 1, marginTop: 50,backgroundColor:"white"}}>
            <Image style={styles.thumb} source={require('./taxi.png')}/>
            <View style = {{marginTop: 20}}>
            <Text>{"You have "+this.state.moneyIndex+". This is enough for direct TAXI usage."}</Text>
            </View>
          </View >
        );
    }
}

const styles = StyleSheet.create({
    okUndo: {
        flexDirection: 'row',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    result: {
        fontSize: 20,
        margin: 10,
    },
    header: {
        textDecorationLine: 'underline',
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: "blue",
    },
    sliderContainer: {
        alignItems: 'center',
    },
    slider: {
        width: 300,
    },
    text: {
        color: 'red',
        fontSize: 24,
    },
    okbutton: {
        borderColor: 'black',
        borderWidth: 1,
        width: 50,
        borderRadius: 20,
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#ffe6f3',
    },
    undobutton: {
        borderColor: 'black',
        borderWidth: 1,
        width: 50,
        borderRadius: 20,
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#ffe6f3',
    },
    buttonText: {
        color: '#3e0f2f',
    },
    thumb: {
      alignSelf: 'center',
      marginTop: 50,
      width: 300, height: 200
    },

});

module.exports = DirectTaxi;
