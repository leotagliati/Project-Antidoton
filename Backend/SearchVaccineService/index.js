const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const localVaccinationsDB = [
    {
        username: 'defaultUser',
        vaccines: [
            {
                id: 1,
                name: 'COVID-19',
                date: '2023-05-10',
                dose: '1ª Dose',
            },
            {
                id: 2,
                name: 'Hepatite B',
                date: '2023-06-20',
                dose: '2ª Dose',
            },
        ]
    }
]
const localVaccinesDB = [
    {
        id: 1,
        name: 'COVID-19',
    },
    {
        id: 2,
        name: 'Hepatite B',
    },
    {
        id: 3,
        name: 'Gripe',
    },
    {
        id: 4,
        name: 'Febre Amarela',
    },
    {
        id: 5,
        name: 'Tétano',
    },
]
app.post('/vaccinations/add', (req, res) => {
    console.log('----------------------------------------------------');
    const { username, vaccine } = req.body;
    if (!username || !vaccine) {
        console.error('Username or vaccine data is missing');
        return res.status(400).json({ error: 'Username e vacina são obrigatórios' });
    }
    const user = localVaccinationsDB.find(user => user.username === username);
    if (!user) {
        console.error(`User ${username} not found`);
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    const newVaccine = {
        id: user.vaccines.length + 1,
        ...vaccine
    };
    user.vaccines.push(newVaccine);
    console.log(`sucessfully added vaccine with id ${newVaccine.id} for user ${username}`);
    res.status(201).json(newVaccine);
    console.log('----------------------------------------------------');
})

app.put('/vaccinations/update/:id', (req, res) => {
    console.log('----------------------------------------------------');
    const { username, vaccineId, vaccine } = req.body;
    if (!username || !vaccine) {
        return res.status(400).json({ error: 'Username e vacina são obrigatórios' });
    }
    const user = localVaccinationsDB.find(user => user.username === username);
    if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    const vaccineIndex = user.vaccines.findIndex(v => v.id === parseInt(vaccineId));
    if (vaccineIndex === -1) {
        return res.status(404).json({ error: 'Vacina não encontrada' });
    }
    user.vaccines[vaccineIndex] = {
        ...user.vaccines[vaccineIndex],
        ...vaccine,
    };
    console.log(`sucessfully updated vaccine with id ${vaccineId} for user ${username}`);
    res.json(user.vaccines[vaccineIndex]);
    console.log('----------------------------------------------------');
})
app.delete('/vaccinations/delete/:id', (req, res) => {
    console.log('----------------------------------------------------');
    const { username } = req.body;
    const vaccineId = parseInt(req.params.id);
    if (!username) {
        return res.status(400).json({ error: 'Username é obrigatório' });
    }
    const user = localVaccinationsDB.find(user => user.username === username);
    if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    const vaccineIndex = user.vaccines.findIndex(v => v.id === vaccineId);
    if (vaccineIndex === -1) {
        return res.status(404).json({ error: 'Vacina não encontrada' });
    }
    user.vaccines.splice(vaccineIndex, 1);
    console.log(`sucessfully deleted vaccine with id ${vaccineIndex} for user ${username}`);
    res.status(200).send();
    console.log('----------------------------------------------------');
});

app.get('/vaccinations', (req, res) => {
    console.log('----------------------------------------------------');
    const { username, vaccineName } = req.query;

    if (!username) {
        return res.status(400).json({ error: 'Username é obrigatório' });
    }

    const user = localVaccinationsDB.find(user => user.username === username);
    if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    let vaccines = user.vaccines;

    if (vaccineName) {
        vaccines = vaccines.filter(v => v.name.toLowerCase().includes(vaccineName.toLowerCase()));
    }
    console.log(`retrieved ${vaccines.length} vaccines for user "${username}" with filter "${vaccineName || 'none'}"`);
    res.json(vaccines);
    console.log('----------------------------------------------------');
});
app.get('/vaccinations/search', (req, res) => {
    console.log('----------------------------------------------------');
    const { username, vaccineName } = req.query;

    if (!username || !vaccineName) {
        return res.status(400).json({ error: 'Username e vaccineName são obrigatórios' });
    }

    const user = localVaccinationsDB.find(user => user.username === username);
    if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const vaccines = user.vaccines.filter(v =>
        v.name.toLowerCase().includes(vaccineName.toLowerCase())
    );

    console.log(`searching "${vaccineName}" for user "${username}", found ${vaccines.length}`);
    res.json(vaccines);
    console.log('----------------------------------------------------');
});

app.post('/event', async (req, res) => {
    console.log('----------------------------------------------------');
    const event = req.body;
    const eventType = event.type;
    if (eventType === 'UserRegistered') {
        console.log(`Received event: ${eventType}`);
        try {
            localVaccinationsDB.push({
                username: event.username,
                vaccines: []
            });
        }
        catch (err) {
            console.error(`Error processing event '${eventType}':`, err.message);
        }
        res.status(200).send({ status: 'Event processed successfully.' });
    }
    else if (eventType === 'UserLogged') {
        console.log(`Received event: ${eventType}`);
        try {
            const user = localVaccinationsDB.find(user => user.username === event.username);
            if (!user) {
                console.error(`User ${event.username} not found`);
                return res.status(404).send({ error: 'Usuário não encontrado' });
            }
        }
        catch (err) {
            console.error(`Error processing event '${eventType}':`, err.message);
        }
        res.status(200).send({ status: 'Event processed successfully.' });
    }
    else {
        console.log(`No handler for event type: ${eventType}`);
        res.status(400).send({ error: 'Event type not supported' });
    }
    console.log('----------------------------------------------------');
});

const port = 3000;
app.listen(port, () => {
    console.clear();
    console.log('----------------------------------------------------');
    console.log(`'Search Vaccine Service' running at port ${port}`);
    console.log('----------------------------------------------------');
});