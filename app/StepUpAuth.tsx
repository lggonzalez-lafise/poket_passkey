import { useEffect, useState } from "react";
import {
    TouchableOpacity,
    Linking,
    View,
    StyleSheet,
    Text,
    TextInput,
} from "react-native";
import {signUp} from "../client/cognito-api";


const StepUpAuth = () => {

    const [username, setUsername] = useState(`lgabriel`);
    const [email, setEmail] = useState(`lgabrielgonzaleslopez.lggl@gmail.com`);
    const [password, setPassword] = useState('Lll1@ggg');
    const [phone_number, setPhoneNumber] = useState(`+50575591715`);

    const handleCreateUser = async () => {
        const result = await signUp({
            username: username,
            password: password,
            /* BELOW PARAMETERS ARE OPTIONAL */
            userAttributes: [
                {
                    name: 'name',
                    value: 'Luis Gabriel Gonzalez Lopez'
                }
            ]
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Crear Cuenta</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={text => setUsername(text)}
                    placeholder="Nombre de Usuario"
                    placeholderTextColor="#fff" />
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={text => setEmail(text)}
                    placeholder="Correo Electrónico"
                    placeholderTextColor="#fff" />
                <TextInput
                    style={styles.input}
                    value={phone_number}
                    onChangeText={text => setPhoneNumber(text)}
                    placeholder="Numero de telefono"
                    placeholderTextColor="#fff" />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    placeholderTextColor="#fff"/>
            </View>

            <TouchableOpacity onPress={()=>handleCreateUser()} style={styles.button}>
                <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>

            <View style={styles.linksContainer}>
                <Text style={styles.linkText}>¿Ya tienes una cuenta?</Text>
                {/*<Link href='/login' asChild>*/}
                {/*    <Pressable>*/}
                {/*        <Text style={[styles.linkText, { fontWeight: 'bold' }]}>Iniciar Sesión</Text>*/}
                {/*    </Pressable>*/}
                {/*</Link>*/}
            </View>
        </View>
    )
}

export default StepUpAuth;


const styles = StyleSheet.create({
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