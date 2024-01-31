import {useEffect, useState} from "react";
import {View, StyleSheet, Text, TextInput, TouchableOpacity, Pressable} from "react-native";
import {Link} from "expo-router";
import {usePasswordless} from "../client/react-native";


export const LoginScreen = ()=>{

    const {authenticateWithPlaintextPassword} = usePasswordless();

    const [username, setUsername] = useState('lgabriel');
    const [password, setPassword] = useState('Lll1@ggg');


    useEffect(()=>{

    }, []);

    const handleLoginValid = async ()=>{
         const response = authenticateWithPlaintextPassword({
            username,
            password,
        }).signedIn.then((response)=>{
            console.log(response);
         }).catch((error)=>{
             console.error(error);
         });
        //response.signedI
    }

   return (
       <View style={styles.container}>
           <Text style={styles.header}>Iniciar Sesión</Text>

           <View style={styles.inputContainer}>
               <TextInput onChangeText={text=>setUsername(text)} style={styles.input} placeholder="Nombre de Usuario" placeholderTextColor="#fff" />
               <TextInput onChangeText={text=>setPassword(text)} style={styles.input} placeholder="Contraseña" placeholderTextColor="#fff" />
           </View>

           <TouchableOpacity onPress={()=>handleLoginValid()} style={styles.button}>
               <Text style={styles.buttonText}>Iniciar Sesión</Text>
           </TouchableOpacity>

           <View style={styles.linksContainer}>
               <Link href='/ForgotPassword'>
                   <Pressable>
                       <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
                   </Pressable>
               </Link>

               <Text style={styles.separator}>|</Text>

               <Link href='/StepUpAuth'>
                   <Pressable>
                       <Text style={styles.linkText}>Crear cuenta</Text>
                   </Pressable>
               </Link>
           </View>
       </View>
   );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: 'rgba(72,61,210,0.48)'
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 40,
    },
    inputContainer: {
        marginVertical: 80,
        backgroundColor: 'rgba(255,255,255,0)',
        width: '100%',
        paddingLeft: 30,
        paddingRight: 30,
    },
    input: {
        height: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 10,
        marginBottom: 20,
        paddingHorizontal: 20,
        color: '#fff',
    },
    button: {
        backgroundColor: '#27ae60',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    linksContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        backgroundColor: "rgba(255,255,255,0)"
    },
    linkText: {
        color: '#fff',
        marginRight: 10,
        fontSize: 16,
    },
    separator: {
        color: '#fff',
        fontSize: 16,
    },
});
