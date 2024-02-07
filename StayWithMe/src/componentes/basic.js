import React, { cloneElement } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function (props) {
    return (
        <View style={styles.container}>
            <Text style={styles.mainText}>{props.texto}Aqui estou mais um dia</Text>
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