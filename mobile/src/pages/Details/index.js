import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'
// import { View, Text, Image, TouchableOpacity } from 'react-native';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Details() {
    const navigation = useNavigation();
    const route = useRoute();

    const books = route.params.book;
    const message = `Olá ${book.name}, estou entrando em contato pois gostaria de adquirir o livro ${book.title} com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(book.value)}.`

    function navigateBack() {
        navigation.goBack()
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Livro de interesse: ${book.title}`,
            recipients: [book.email],
            body: message
        })
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${book.whatsapp}&text=${message}`);
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />

                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E02041" />
                </TouchableOpacity>
            </View>

            <View style={styles.book}>
                <Text style={[styles.bookProperty, { marginTop: 0 }]}>SEBO:</Text>
                <Text style={styles.bookValue}>{book.name} de {book.city} / {book.uf}</Text>

                <Text style={styles.bookProperty}>SEBO:</Text>
                <Text style={styles.bookValue}>{book.name}</Text>

                <Text style={styles.bookProperty}>AUTOR:</Text>
                <Text style={styles.bookValue}>{book.author}</Text>
                
                <Text style={styles.bookProperty}>LIVRO:</Text>
                <Text style={styles.bookValue}>{book.title}</Text>
                
                <Text style={styles.bookProperty}>VALOR:</Text>
                <Text style={styles.bookValue}>
                    {Intl.NumberFormat('pt-BR', { 
                        style: 'currency', 
                        currency: 'BRL' 
                    }).format(book.value)}
                </Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.seboTitle}>Salve a cultura!</Text>
                <Text style={styles.seboTitle}>Seja o leitor desse livro.</Text>

                <Text style={styles.seboDescription}>Entre em contato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                    {/* <TouchableOpacity style={styles.action} onPress={() => {}}> */}
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                    {/* <TouchableOpacity style={styles.action} onPress={() => {}}> */}
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
