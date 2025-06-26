const { logUser, registerUserService } = require('../services/userService');
const { createToken } = require('../utils/jwt');
const axios = require('axios');

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Username and password are required' });

    try {
        const user = await logUser(username, password);
        const token = createToken(user);
        await axios.post('http://localhost:3002/event', { type: 'UserLogged', username: user.username });
        res.status(200).json({ message: 'Login successful', token, user });
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
};

exports.registerUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Username and password are required' });

    try {
        const user = await registerUserService(username, password);
        const token = createToken(user);
        await axios.post('http://localhost:3002/event', { type: 'UserRegistered', username: user.username });
        res.status(201).json({ message: 'User registered successfully', token, user });
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
};
