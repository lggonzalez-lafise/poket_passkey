import AsyncStorage from "@react-native-async-storage/async-storage";
import {View, Text, StyleSheet} from "react-native";
import React from "react";
import {Passwordless, PasswordlessContextProvider} from "../client/react";
import {LoginScreen} from "./Login";

const Index = () => {
    return (
        <PasswordlessContextProvider>
            <View style={styles.container}>
              <LoginScreen />
            </View>
        </PasswordlessContextProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: 'rgba(72,61,210,0.48)'
    },
});

export default Index;

