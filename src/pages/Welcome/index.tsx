import React from 'react';
import {
    SafeAreaView,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    View
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import {Entypo} from "@expo/vector-icons";

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import watering from '../../assets/watering.png';

export function Welcome(){
    const navigation = useNavigation();

    function handleStart() {
        navigation.navigate("UserIdentification");
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>
                    Gerencie {'\n'}
                    suas plantas de {'\n'}
                    forma fácil
                </Text>

                <Image 
                    source={watering}
                    style={styles.image}
                    resizeMode='contain'
                />

                <Text style={styles.subtitle}>
                    Não esqueça mais de regar suas plantas.
                    Nós cuidamos de lembrar você sempre que precisar.
                </Text>

                <TouchableOpacity style={styles.button} onPress={handleStart}>
                    <Entypo name="chevron-right" style={styles.buttonIcon} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    wrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        paddingHorizontal: 20,
    },

    title: {
        fontFamily: fonts.heading,
        fontSize: 32,
        textAlign: "center",
        color: colors.heading,
        lineHeight: 36,
        marginTop: 34,
    },

    subtitle: {
        fontFamily: fonts.text,
        textAlign: "center",
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading
    },

    image: {
        height: Dimensions.get('window').width * 0.7,
    },

    button: {
        backgroundColor: colors.green,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
        width: 56,
    },

    buttonIcon: {
        color: colors.white,
        fontSize: 28,
    }
})