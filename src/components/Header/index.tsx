import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import AsyncStorage from '@react-native-async-storage/async-storage';

import userImg from '../../assets/epitacio.png';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export function Header() {
    const [name, setName] = useState<string>();

    useEffect(() => {
        async function loadStorageUserName() {
            const name = await AsyncStorage.getItem('@plantManager:name');
            setName(name);
        }

        loadStorageUserName();
    }, [])

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>
                    Olá,
                </Text>
                <Text style={styles.userName}>{name}</Text>

            </View>
            <Image source={userImg} style={styles.image} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight(),
    },
    
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text,
    },

    userName: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.heading,
    },

    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
    }
})