const { localVaccinationsDB } = require('../services/vaccineService');

module.exports = (req, res) => {
    const { type, username } = req.body;

    if (type === 'UserRegistered') {
        localVaccinationsDB.push({ username, vaccines: [] });
        return res.status(200).send({ status: 'OK - User registered' });
    }

    if (type === 'UserDeleted') {
        const index = localVaccinationsDB.findIndex(u => u.username === username);
        if (index !== -1) localVaccinationsDB.splice(index, 1);
        return res.status(200).send({ status: 'OK - User deleted' });
    }

    res.status(400).json({ error: 'Unhandled event type' });
};
