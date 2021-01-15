import React, { useState } from 'react';

import Table from '../../components/UserItem'
import './style.css';

function UserForm({ onSubmit }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        await onSubmit({
            name,
            email,
        });
        
        setName('');
        setEmail('');
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="input-block">
                <input name="name" id="name" required value={name} onChange={e => setName(e.target.value)} />
                <label htmlFor="name">Nome do usuário</label>
            </div>

            <div className="input-block">
                <input name="email" id="email" required value={email} onChange={e => setEmail(e.target.value)} />
                <label htmlFor="email">E-mail</label>
            </div>

            <button type="submit">Salvar</button>
        </form>
    );
}

export default UserForm;