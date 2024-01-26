import {TextInput, View, Text} from "react-native";
import React from "react";
import { Styles, Palette } from "../styles/styles";


interface Styles {
    [key: string]: any;
}

export const Input = (props: { style: Styles; verified?: boolean })=>{
    return (
        <View>
            <TextInput
                placeholderTextColor={Palette.backgroundDark}
                {...props}
                style={[Styles.input, props.style]}
            />
            {props.verified ? (
                <View style={Styles.verifiedContainer}>
                    <Text style={Styles.verifiedText}>✓</Text>
                    <Text style={Styles.verifiedText}>✓</Text>
                </View>
            ) : null}
        </View>
    );
}