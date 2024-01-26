import {Passwordless} from "amazon-cognito-passwordless-auth";
import Config from "react-native-config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {retrieveTokens} from "amazon-cognito-passwordless-auth/storage";

Passwordless.configure({
    cognitoIdpEndpoint: Config.COGNITO_IDP_ENDPOINT ?? '',
    clientId: Config.CLIENT_ID ?? '',
    userPoolId: Config.USER_POOL_ID,
    fido2: {
        baseUrl: Config.FIDO2_BASE_URL ?? '',
        authenticatorSelection: {
            userVerification: "required",
        },
        //passkeyDomain: Config.PASSKEY_DOMAIN ?? '',
    },
    proxyApiHeaders: {
      "x-api-key": Config.COGNITO_IDP_ENDPOINT_API_KEY ?? ''
    },
    //proxApiHeaders: {'x-api-key': Config.COGNITO_IDP_ENDPOINT_API_KEY ?? '',},
    storage: AsyncStorage,
    debug: console.debug,
    // fetch: async (input, init) => {
    //     const targetUrl = new URL(input instanceof URL
    //             ? input.href
    //             : input instanceof Request ? input.url : input
    //     );
    //     if (targetUrl.href.match(Config.COGNITO_IDP_ENDPOINT ?? '') && init?.headers) {
    //         const headers = new Headers(init.headers);
    //         headers.set("x-api-key", Config.COGNITO_IDP_ENDPOINT_API_KEY ?? '');
    //         const { username } = (await retrieveTokens()) ?? {};
    //         if (username) {
    //             headers.set("x-username", username ?? "");
    //         }
    //         //init.headers = headers;
    //     }
    //     return fetch(input, init);
    // },
});