import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

const logo_World = '../../../assets/logo-world.png';
export default function Home() {

    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Image style={styles.logo} source={require(logo_World)} />
                <Text style={styles.textMain}>Coleta Coletiva</Text>
            </TouchableOpacity>
            <View style={styles.inputTextView}>
                <TextInput
                    style={styles.inputText}
                    placeholder='Email:'
                    placeholderTextColor={'#00FFFF'} inputMode='email'
                />
                <Icon style={styles.loginIcon} name='user-circle' />
                <TextInput
                    style={styles.inputText}
                    placeholder='Senha:'
                    placeholderTextColor={'#00FFFF'}
                />
                <Icon2 style={styles.loginIcon} name='password' />
            </View>
        </View>
    )
}