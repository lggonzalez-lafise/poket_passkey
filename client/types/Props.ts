import React from "react";

interface CustomBrand {
    backgroundImageUrl?: string;
    customerName?: string;
    customerLogoUrl?: string;
}

interface Styles {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

interface ButtonProps {
    children: React.ReactNode;
    onPress?: () => void | Promise<void>;
    onClick?: () => void | Promise<void>;
    outlined?: boolean;
    disabled?: boolean;
    link?: boolean;
    style?: Styles;
}

export {CustomBrand, Styles, ButtonProps};