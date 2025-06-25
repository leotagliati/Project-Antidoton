const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const axios = require('axios');
const saltRounds = 10;

const app = express();
app.use(cors());
app.use(express.json());

// Banco de dados local simulado
const localDB = [
    {
        id: 1,
        username: 'admin',
        password: bcrypt.hashSync('admin', saltRounds),
        isAdmin: true
    }
];

// Função para login (Promise)
function logUser(username, password) {
    return new Promise((resolve, reject) => {
        const user = localDB.find(user => user.username === username);
        if (!user) {
            return reject({ status: 404, message: 'User not found' });
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (err) return reject({ status: 500, message: 'Error comparing passwords' });
            if (!result) return reject({ status: 401, message: 'Invalid password' });

            console.log(`User ${username} logged in successfully`);
            resolve({ username: user.username , isAdmin: user.isAdmin });
        });
    });
}

// Função para registro (Promise)
function registerUser(username, password) {
    return new Promise((resolve, reject) => {
        const exists = localDB.find(user => user.username === username);
        if (exists) {
            return reject({ status: 400, message: 'Username already exists' });
        }

        bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
            if (err) return reject({ status: 500, message: 'Error hashing password' });

            const newUser = {
                id: localDB.length + 1,
                username,
                password: hashedPassword,
                isAdmin: false 
            };

            localDB.push(newUser);
            console.log(`User ${username} registered successfully`);
            resolve({ username: newUser.username });
        });
    });
}

// Rota de login
app.post('/auth/login', (req, res) => {
    console.log('-----------------------------------------------------')
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    logUser(username, password)
        .then(user => {
            const event = {
                type: 'UserLogged',
                username: user.username
            };
            return axios.post('http://localhost:3002/event', event)
                .then(() => {
                    console.log(`Event sent: ${event.type}`);
                    res.status(200).json({ message: 'Login successful', user });
                });
        })
        .catch(err => {
            console.error(`Login error: ${err.message}`);
            res.status(err.status || 500).json({ error: err.message });
        });
    console.log('-----------------------------------------------------')
});

// Rota de registro
app.post('/auth/register', (req, res) => {
    console.log('-----------------------------------------------------')
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    registerUser(username, password)
        .then(user => {
            const event = {
                type: 'UserRegistered',
                username: user.username
            };
            return axios.post('http://localhost:3002/event', event)
                .then(() => {
                    console.log(`Event sent: ${event.type}`);
                    res.status(201).json({ message: 'User registered successfully', user });
                });
        })
        .catch(err => {
            res.status(err.status || 500).json({ error: err.message });
        });
    console.log('-----------------------------------------------------')
});

// Rota para obter todos os usuários (apenas para administradores)
app.get('/users', (req, res) => {
    console.log('-----------------------------------------------------')
    const isAdmin = req.query.isAdmin === 'true';
    if (!isAdmin) {
        return res.status(403).json({ error: 'Access denied' });
    }
    res.status(200).json(localDB.map(user => ({
        username: user.username,
        isAdmin: user.isAdmin
    })));
    console.log('-----------------------------------------------------')
});

// Somente admins podem utilizar a rota
app.patch('/users/:username', (req, res) => {
    console.log('-----------------------------------------------------')
    const { username } = req.params;
    const { role } = req.body;
    if(role === 'admin')
    {
        const user = localDB.find(user => user.username === username);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.isAdmin = true;
        console.log(`User ${username} updated to admin`);
        res.status(200).json({ message: 'User updated successfully', user });
    }
    else if(role === 'user')
    {
        const user = localDB.find(user => user.username === username);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.isAdmin = false;
        console.log(`User ${username} updated to user`);
        res.status(200).json({ message: 'User updated successfully', user: user.username });
    }
    else {
        return res.status(400).json({ error: 'Invalid role' });
    }
    console.log('-----------------------------------------------------')
});

// somente admins podem utilizar a rota
app.delete('/users/:username', (req, res) => {
    console.log('-----------------------------------------------------')
    const { username } = req.params;
    const isAdmin = req.query.isAdmin === 'true';
    if (!isAdmin) {
        return res.status(403).json({ error: 'Access denied' });
    }
    const userIndex = localDB.findIndex(user => user.username === username);
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    localDB.splice(userIndex, 1);
    console.log(`User ${username} deleted successfully`);
    res.status(200).json({ message: 'User deleted successfully' });
    console.log('-----------------------------------------------------')
});

// Inicialização do servidor
const port = 3001;
app.listen(port, () => {
    console.clear();
    console.log('-----------------------------------------------------')
    console.log(`Authentication Service is running on port ${port}`);
    console.log('-----------------------------------------------------')
});
