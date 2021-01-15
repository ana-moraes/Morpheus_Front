import React, { useState, useEffect } from 'react';
import api from '../../services/Api';
import './style.css';
function Table() {

    const [user, setUsers] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/users');
            setUsers(response.data);
        }
        loadUsers();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        function loadSearch() {
            const data = { name: name };
            let response = api.post('/search', data); 

            return response;
        }
        const printData = async () => {
            const a = await loadSearch().then((res) => {
                return res.data;
              });
            return a
          };
        const lista = await printData();
        setUsers(lista);
    }

    const renderHeader = () => {
        let headerElement = ['ID', 'Nome', 'E-mail', 'Data de registro']
        return headerElement.map((key, index) => {
            return <th key={index}>{key}</th>
        })
    }
    const renderBody = () => {
        console.log(user)
        return user && user.map(({ _id, name, email, registryDate }) => {
            return (
                <tr key={_id}>
                    <td>{_id}</td>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{registryDate}</td>
                </tr>
            )
        })
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input id='user-find' value={name} onChange={e => setName(e.target.value)}></input>
                <button type="submit" >Buscar</button>
                <div>
                    <table id='users'>
                        <thead>
                            <tr>{renderHeader()}</tr>
                        </thead>
                        <tbody>
                            {renderBody()}
                        </tbody>
                    </table>
                </div>
            </form>
        </>
    );

}
export default Table