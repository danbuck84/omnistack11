import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NewBook() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    const seboId = localStorage.getItem('seboId');

    async function handleNewBooks(e) {
        e.preventDefault();

        const data = {
            title,
            author,
            description,
            value,
        };

        try {
            await api.post('books', data, {
                headers: {
                    Authorization: seboId,
                }
            })

            history.push('/profile');
        } catch (err) {
            alert('Erro ao cadastrar livro, tente novamente.');
        }
    }

    return (
        <div className="new-book-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Book Finder"/>

                    <h1>Cadastrar novo livro</h1>
                    <p>Descreva o livro detalhadamente para encontrarmos o melhor leitor para ele.</p>

                    <Link className="back-link"to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Página inicial
                    </Link>
                </section>
                <form onSubmit={handleNewBooks}>
                    <input 
                        placeholder="Nome do livro"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        />
                    <input 
                        placeholder="Nome do autor"
                        value={author}
                        onChange={e => setAuthor(e.target.value)}
                        />
                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        />
                    <input 
                        placeholder="Valor em Reais (R$)"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        />


                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}
