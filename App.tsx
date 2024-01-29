import AsyncStorage from "@react-native-async-storage/async-storage";
import {View, Text, StyleSheet} from "react-native";
import React from "react";
import {Fido2Toast, Passwordless, PasswordlessContextProvider} from "./client/react";
import {StatusBar} from "expo-status-bar";
import {PasswordlessComponent} from "./client/react-native";
import {LoginScreen} from "./src/Login";

const App = () => {
    return (
    <PasswordlessContextProvider enableLocalUserCache={true}>
        <PasswordlessComponent
            brand={{
                backgroundImageUrl: "",
                customerName: "",
                customerLogoUrl:
                    "",
            }}>
            {/*<View style={styles.container}>*/}
            {/*    <Text>Open up App.tsx to start working on your app!</Text>*/}
            {/*    <StatusBar style="auto" />*/}
            {/*</View>*/}
            <LoginScreen />
        </PasswordlessComponent>
        <Fido2Toast />
        <StatusBar style="dark" />
    </PasswordlessContextProvider>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default App;

Passwordless.configure({
    cognitoIdpEndpoint: 'us-east-1', //Config.COGNITO_IDP_ENDPOINT
    clientId: '67k7u7lm5873cidui071r086d1', // Config.CLIENT_ID
    userPoolId: 'us-east-1_XC2iW0KYs', //Config.USER_POOL_ID
    fido2: {
        baseUrl: 'https://xkwhks9zb4.execute-api.us-east-1.amazonaws.com/v1/', //Config.FIDO2_BASE_URL
        authenticatorSelection: {
            userVerification: "required",
        },
        passkeyDomain: '', //Config.PASSKEY_DOMAIN
    },
    proxyApiHeaders: {
        "x-api-key":  'us-east-1',//Config.COGNITO_IDP_ENDPOINT_API_KEY,
    },
    storage: AsyncStorage,
    debug: console.debug,
    // fetch: async (input, init) => {
    //     const targetUrl = new URL(
    //         input instanceof URL
    //             ? input.href
    //             : input instanceof Request
    //                 ? input.url
    //                 : input
    //     );
        // if (targetUrl.href.match(Config.COGNITO_IDP_ENDPOINT) && init?.headers) {
        //     const headers = new Headers(init.headers);
        //     headers.set("x-api-key", Config.COGNITO_IDP_ENDPOINT_API_KEY);
        //     const { username } = (await retrieveTokens()) ?? {};
        //     if (username) {
        //         headers.set("x-username", username ?? "");
        //     }
        //     init.headers = headers;
        // }
        // return fetch(input, init);
    //},
});
