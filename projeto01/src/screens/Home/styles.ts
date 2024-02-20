import { StyleSheet } from "react-native";

 const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#389',
    },
    textMain: {
        color: '#2F4F4F',
        marginTop: 5,
        marginBottom: 20,
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: '500',
        fontStyle: 'italic',
    },
    text: {
        color: '#2F4F4F',
        marginTop: 24,
        fontSize: 20,
    },

    inputTextView: {
        flex: 2,
        justifyContent: 'flex-end',
        marginBottom: 150,
    },
    inputText: {
        backgroundColor: '#2F4F4F',
        borderWidth: 2,
        borderColor: '#008B8B',
        margin: 3,
        padding: 4,
        paddingLeft: 15,
        borderRadius: 5,
        fontSize: 17,
        width: '80%',
        alignSelf: 'center',
        textAlign: 'left',
        justifyContent:'flex-end',
        color: '#00FFFF',
    },
    logo : {
        width: 140,
        height: 140,
        marginTop: 60,
        alignSelf: 'center'
    },
});

export default styles;