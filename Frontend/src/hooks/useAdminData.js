import { useEffect, useState } from 'react';
import clientAuth from '../utils/clientAuth';
import clientVaccines from '../utils/clientVaccines';

export const useAdminData = (activeSheet, navigate) => {
    const [users, setUsers] = useState([]);
    const [vaccines, setVaccines] = useState([]);

    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin') === 'true';

        if (!isAdmin) {
            navigate('/login', { replace: true });
            return;
        }

        if (activeSheet === 'users') fetchUsers();
        else fetchVaccines();
    }, [activeSheet]);

    const fetchUsers = () => {
        clientAuth.get('/users', { params: { isAdmin: true } })
            .then(res => {
                setUsers(res.data.map(u => ({ ...u, role: u.isAdmin ? 'admin' : 'user' })));
            })
            .catch(console.error);
    };

    const fetchVaccines = () => {
        clientVaccines.get('/vaccines')
            .then(res => setVaccines(res.data))
            .catch(console.error);
    };

    return {
        users, setUsers,
        vaccines, setVaccines
    };
};
