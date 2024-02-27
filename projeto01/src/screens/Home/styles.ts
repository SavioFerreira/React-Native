import { StyleSheet } from "react-native";

 const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#389',
    },
    textLogo: {
        color: '#2F4F4F',
        marginTop: 5,
        marginBottom: 20,
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: '700',
        fontStyle: 'italic',
    },
    text: {
        color: '#2F4F4F',
        marginTop: 24,
        fontSize: 20,
    },
    textlogin: {
        color: '#1F2F79',
        marginTop: 20,
        marginHorizontal: 50,
        fontWeight: '800',
        fontSize: 19,
        fontStyle: 'italic',
        alignSelf: 'center',
        textAlign: 'center',
        borderWidth: 0.5,
        borderColor: 'blue',
    },

    inputTextView: {
        flex: 1,
        justifyContent: 'flex-end',
        width: '100%',
        marginBottom: 30,
        padding: 50,
        borderWidth: 2,
        borderColor: 'blue',
    },
    inputIconView: {
        width: '100%',
        marginRight: 30,
        alignItems: 'center',
        flexDirection: "row",
        borderWidth: 0.5,
        borderColor: 'blue',
    },
    inputText: {
        backgroundColor: '#2F4F4F',
        borderWidth: 4,
        borderColor: '#008B8B',
        margin: 3,
        padding: 8,
        paddingLeft: 11,
        borderRadius: 8,
        fontSize: 17,
        width: '100%',
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
        fontSize: 27,
        justifyContent: 'center',
        marginEnd: 40,
        borderColor: 'blue',
        borderWidth: 0.5,
    },
});

export default styles;