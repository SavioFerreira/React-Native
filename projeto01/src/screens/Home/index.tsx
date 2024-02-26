import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Alert, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

const logo_World = '../../../assets/logo-world.png';
export default function Home() {

    function showColetaColetivaLongPress() {
        return (
            Alert.alert('Coleta Coletiva - SFC',
                'App Feito com react Native no mobile e Java spring no backEnd.\n' +
                'O banco de dados utilizado foi o postgress e e RealmDB\n' +
                'A meta é construir todo o app até o final de maio, para que seja possível apresentar' + 
                'a banca até o dia marcado em junho.')
        )
    }
    
    function showColetaColetivaPress() {
        return (
            Alert.alert('Coleta Coletiva',
                'App Coleta coletiva\nProjeto final de curso\nSávio Ferreira')
        )
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity 
                onLongPress={showColetaColetivaLongPress}
                onPress={showColetaColetivaPress}>
                <Image style={styles.logo} source={require(logo_World)} />
                <Text style={styles.textMain}>Coleta Coletiva</Text>
            </TouchableOpacity>
            <View style={styles.inputTextView}>
                <View style={styles.inputIconView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder='Email:'
                        placeholderTextColor={'#00FFFF'} inputMode='email'

                    />
                    <Icon style={styles.loginIcon} name='user-circle' />
                </View>
                <View style={styles.inputIconView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder='Senha:'
                        placeholderTextColor={'#00FFFF'}
                    />
                    <Icon2 style={styles.loginIcon} name='password' />
                </View>

            </View>
        </View>

    )
}