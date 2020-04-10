import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Books() {
    const [books, setBooks] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    function navigateToDetails(book) {
        navigation.navigate('Details', { book });
    }

    async function loadBooks() {
        if (loading) {
            return;
        }

        if (total > 0 && book.length === total) {
            return;
        }

        setLoading(true);

        const response = await api.get('book', {
            params: { page }
        });

        setBooks([...book, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadBooks()
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} livros</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem vindo!</Text>
            <Text style={styles.description}>Escolha um dos livros abaixo, e boa leitura.</Text>

            <FlatList 
                data={books}
                style={styles.bookList}
                keyExtractor={book => String(book.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadBooks}
                onEndReachedThreshold={0.2}
                renderItem={({ item: book }) => (
                    <View style={styles.book}>
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
                        
                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={() => navigateToDetails(book)}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}
