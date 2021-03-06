import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableHighlightProps } from 'react-native';
import colors from '../../styles/colors';

interface ButtonProps extends TouchableHighlightProps{
    title: string,
}

export function Button({ title, ...rest }: ButtonProps) {
    return (
        <TouchableOpacity style={styles.button} {...rest}>
            <Text style={styles.buttonText}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.green,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
        height: 56,
    },

    buttonText: {
        color: colors.white,
        fontSize: 24,
    }
})