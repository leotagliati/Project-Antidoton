const express = require('express');
const axios = require('axios');
const router = express.Router();

const services = require('../config/services');
const eventRoutes = require('../config/eventRoutes');

router.post('/event', async (req, res) => {
    console.log('----------------------------------------------------');
    const event = req.body;
    const eventType = event.type;

    if (eventRoutes[eventType]) {
        console.log(`Listeners for the event '${eventType}':`, eventRoutes[eventType]);
        try {
            const promises = eventRoutes[eventType].map(({ service }) => {
                const { port } = services[service];
                const url = `http://localhost:${port}/event`;
                return axios.post(url, event);
            });

            await Promise.all(promises);
            console.log(`Event '${eventType}' sent to listener services.`);
        } catch (err) {
            console.error(`Error sending event '${eventType}':`, err.message);
        }
    } else {
        console.log(`No listener found for '${eventType}'`);
    }

    console.log('----------------------------------------------------');
    res.status(200).send({ status: 'Event processed successfully.' });
});

module.exports = router;
