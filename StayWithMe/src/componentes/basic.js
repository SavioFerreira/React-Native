import React, { cloneElement } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";

export default function (props) {
    return (
        
        <View style={styles.container}>
            <StatusBar barStyle={"light-content"} backgroundColor={'black'}/>
            <Text style={styles.mainText}>{props.texto}</Text>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'black'
    },
    mainText: {
        fontSize: 30,
        fontWeight: "bold",
        color : "purple",
    }
});