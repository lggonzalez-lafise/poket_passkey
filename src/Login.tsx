import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import {usePasswordless} from "../client/react";
import {Button, Styles} from "../client/react-native";


export const LoginScreen = ()=>{

    const {
        signOut,
        signInStatus,
        showAuthenticatorManager,
        toggleShowAuthenticatorManager,
        tokensParsed,
    } = usePasswordless();

    const [showStepUpAuth, setShowStepUpAuth] = useState(false);
    if (showStepUpAuth && signInStatus !== "SIGNED_IN") setShowStepUpAuth(false);

   return (
       <View style={styles.container}>
           <Text>This YOUR app</Text>
           <Text>Hi there {tokensParsed?.idToken.email}</Text>
           <Button outlined={true}
               onClick={() => {
                   signOut();
               }}>
               <Text style={Styles.outlinedButtonText}>Sign out</Text>
           </Button>
           <Button
               onClick={() => toggleShowAuthenticatorManager()}
               disabled={showAuthenticatorManager}
           >
               <Text style={Styles.buttonText}>Manage authenticators</Text>
           </Button>
           {showStepUpAuth ? (
               <View>
                   <Text>The screen flow auth</Text>
               </View>
           ) : (
               <Button onClick={() => setShowStepUpAuth(true)}>
                   <Text style={Styles.buttonText}>Show Step Up Auth</Text>
               </Button>
           )}
       </View>
   );
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#efefef",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },
});