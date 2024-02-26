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
        flex: 1,
        justifyContent: 'flex-end',
        width: '100%',
        marginBottom: 180,
    },
    inputIconView: {
        width: '100%',
        paddingLeft: 50,
        alignItems: 'center',
        flexDirection: "row",
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
    loginIcon: {
        color: '#00FFFF',
        fontSize: 25,
        justifyContent: 'center',
        marginEnd: 40
    },
});

export default styles;