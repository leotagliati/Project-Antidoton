const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const app = express();
app.use(cors());
app.use(express.json());

const localDB = [
    {
        username: 'defaultUser',
        password: 'defaultPassword'
    }
]
app.post('/auth/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }
    const user = localDB.find(user => user.username === username);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    // password check
    bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
            console.error(`Error comparing passwords for user ${username}:`, err);
            return res.status(500).json({ error: 'Error comparing passwords' });
        }
        if (!result) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        console.log(`User ${username} logged in successfully`);
        res.status(200).json({
            message: 'Login successful', user: { username: user.username }
        });
    });

})
app.post('/auth/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    const user = localDB.find(user => user.username === username);
    if (user) {
        return res.status(400).json({ error: 'Username already exists' });
    }
    const newUser = {
        id: localDB.length + 1,
        username: username,
        password: bcrypt.hashSync(password, saltRounds)
    };
    localDB.push(newUser);
    console.log(`User ${username} registered successfully`);

    res.status(201).json({
        message: 'User registered successfully', user: newUser


    })
})

app.listen(3001, () => {
    console.clear();
    console.log('Authentication Service is running on port 3001');
})