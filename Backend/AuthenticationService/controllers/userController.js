const { localDB } = require('../services/userService');
const axios = require('axios');

exports.getUsers = (req, res) => {
    const isAdmin = req.query.isAdmin === 'true';
    if (!isAdmin) return res.status(403).json({ error: 'Access denied' });

    const users = localDB.map(user => ({ username: user.username, isAdmin: user.isAdmin }));
    res.status(200).json(users);
};

exports.updateUserRole = (req, res) => {
    const { username } = req.params;
    const { role } = req.body;
    const user = localDB.find(user => user.username === username);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (role === 'admin') user.isAdmin = true;
    else if (role === 'user') user.isAdmin = false;
    else return res.status(400).json({ error: 'Invalid role' });

    res.status(200).json({ message: 'User updated successfully', user });
};

exports.deleteUser = async (req, res) => {
    const { username } = req.params;
    const isAdmin = req.query.isAdmin === 'true';
    if (!isAdmin) return res.status(403).json({ error: 'Access denied' });

    const index = localDB.findIndex(user => user.username === username);
    if (index === -1) return res.status(404).json({ error: 'User not found' });

    localDB.splice(index, 1);
    await axios.post('http://localhost:3002/event', { type: 'UserDeleted', username });
    res.status(200).json({ message: 'User deleted successfully' });
};
