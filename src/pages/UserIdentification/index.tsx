import React, { useState } from 'react';
import { 
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button } from '../../components/Button';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export function UserIdentification() {
    const [inputIsFocused, setInputIsFocused] = useState(false);
    const [inputIsFilled, setInputIsFilled] = useState(false)
    const [name, setName] = useState<string>()
    const navigation = useNavigation();

    function handleInputBlur() {
        setInputIsFocused(false);
    }

    function handleInputFocus() {
        setInputIsFocused(true);
    }

    function handleInputChange(value: string) {
        setInputIsFilled(!!value);
        setName(value);
    }

    async function handleConfirmation() {
        if(!name)
            return Alert.alert(`Me diz como chamar você. 😢`);

        try{
            await AsyncStorage.setItem('@plantManager:name', name);
            navigation.navigate("Confirmation", {
                title: 'Prontinho',
                subTitle: 'Agora vamos começas a cuidar das suas plantinhas com muito cuidados.',
                buttonTitle: 'Começar',
                icon: 'smile',
                nextScreen: 'PlantSelect'
            });
        }catch(err) {
            Alert.alert("Não foi possivel salvar o seu nome. 😢")
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <View style={styles.header}>
                                <Text style={styles.emoji}>
                                    { inputIsFilled ? '😁' : '😀' }
                                </Text>

                                <Text style={styles.title} >
                                    Como podemos {'\n'}
                                    chamar você?
                                </Text>
                            </View>

                                <TextInput 
                                    style={[
                                        styles.input,
                                        (inputIsFocused || inputIsFilled) && {borderColor: colors.green},
                                    ]}
                                    placeholder="Digite um nome"
                                    onBlur={handleInputBlur}
                                    onFocus={handleInputFocus}
                                    onChangeText={handleInputChange}
                                />
                            <View style={styles.footer}>
                                <Button title="confirmar" onPress={handleConfirmation} />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    content: {
        flex: 1,
        width: '100%',
    },

    form:{
         flex: 1,
         justifyContent: 'center',
         alignItems: 'center',
         paddingHorizontal: 54
    },

    header:{
        alignItems: 'center',
    },

    emoji: {
        fontSize: 44,
    },

    title: {
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 20,
    },

    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center',
    },

    footer: {
        width: '100%',
        marginTop: 40,
        paddingHorizontal: 20,
    }
})