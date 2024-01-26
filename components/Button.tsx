import React from "react";
import {TouchableOpacity} from "react-native";
import { Styles as _Styles } from "../styles/styles";

export const Styles = _Styles;

interface ButtonProps {
    children: React.ReactNode;
    onPress?: () => void | Promise<void>;
    onClick?: () => void | Promise<void>;
    outlined?: boolean;
    disabled?: boolean;
    link?: boolean;
    style?: Styles;
    title?: string;
    type?: string;
}

interface Styles {
    [key: string]: any;
}

export const Button = ({ children, ...props }: ButtonProps) => {
    return (
        <TouchableOpacity
            {...props}
            onPress={props.onPress || props.onClick}
            style={[
                Styles.button,
                props.outlined ? Styles.outlinedButton : null,
                props.disabled ? Styles.disabled : null,
                props.outlined && props.disabled ? Styles.outlinedDisabled : null,
                props.link ? Styles.linkButton : null,
                props.style,
            ]}>
            {children}
        </TouchableOpacity>
    );
};