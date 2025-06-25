const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const services = {
    searchVaccinesService: { port: 3000 },
    userLoginService: { port: 3001 },
};

const eventRoutes = {
    UserRegistered: [{ service: 'searchVaccinesService' }],
    UserLogged: [{ service: 'searchVaccinesService' }],
};

app.post('/event', async (req, res) => {
    console.log('----------------------------------------------------')
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

            console.log(`Event '${eventType}' sent to listeners services.`);
        }
        catch (err) {
            console.error(`Error sending event '${eventType}':`, err.message);

        }
    }
    else {
        console.log(`There's no listener for '${eventType}'`);
    }
    console.log('----------------------------------------------------')
    res.status(200).send({ status: 'Event processed successfully.' });
});

const port = 3002
app.listen(port, () => {
    console.clear();
    console.log('----------------------------------------------------')
    console.log(`'Event Bus' running at port ${port}`)
    console.log('----------------------------------------------------')

})