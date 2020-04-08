import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import { FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
    const [books, setBooks] = useState([]);

    const history = useHistory();

    const seboId = localStorage.getItem('seboId');
    const seboName = localStorage.getItem('seboName');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: seboId,
            }
        }).then(response => {
            setBooks(response.data);
        })
    }, [seboId]);

    async function handleDeleteBook(id) {
        try {
            await api.delete(`books/${id}`, {
                headers: {
                    Authorization: seboId,
                }
            });

            setBooks(books.filter(books => books.id !== id));
        } catch (err) {
            alert('Erro ao deletar livro, tente novamente.');
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Book Finder"/>
                <span>Bem vindo, {seboName}</span>

                <Link className="button" to="/books/new">Cadastrar novo livro</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Livros cadastrados</h1>

            <ul>
                {books.map(books => (
                    <li key={books.id}>
                        <strong>LIVRO:</strong>
                        <p>{books.title}</p>

                        <strong>AUTOR:</strong>
                        <p>{books.author}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{books.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(books.value)}</p>

                        <button onClick={() => handleDeleteBook(books.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
