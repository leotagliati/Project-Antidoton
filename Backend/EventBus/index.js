require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const services = {
    authenticationService: { port: 3001 },
    userLoginService: { port: 3002 },
};

const eventRoutes = {
    UserRegistered: [{ service: 'authenticationService' }],
    UserLogged: [{ service: 'authenticationService' }],
};

app.post('/event', async (req, res) => {
    const event = req.body;
    const eventType = event.type;

    if (eventRoutes[eventType]) {
        console.log(`Microsserviços ouvindo o evento '${eventType}':`, eventRoutes[eventType]);
        try {
            const promises = eventRoutes[eventType].map(({ service }) => {
                const { port } = services[service];
                const url = `http://localhost:${port}/event`;
                // console.log(`Enviando evento '${eventType}' para o microsserviço: ${service} na rota: ${url}`);
                return axios.post(url, event);
            });

            await Promise.all(promises);

            console.log(`Evento '${eventType}' enviado com sucesso para os microsserviços ouvintes.`);
        }
        catch (err) {
            console.error(`Erro ao enviar evento '${eventType}':`, err.message);

        }
    }
    else {
        console.log(`Nenhum microsserviço ouvindo o evento '${eventType}'`);
    }
    res.status(200).send({ status: 'Evento processado com sucesso.' });
});

const port = process.env.BUS_PORT
app.listen(port, () => {
    console.clear();
    console.log('----------------------------------------------------')
    console.log(`'Event Bus' running at port ${port}`)
    console.log('----------------------------------------------------')

})