const express = require('express');
const cors = require('cors');
const authenticateToken = require('./Middlewares/authenticateMiddleware');
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
];

const localVaccinesDB = [
    { id: 1, name: 'COVID-19' },
    { id: 2, name: 'Hepatite B' },
    { id: 3, name: 'Gripe' },
    { id: 4, name: 'Febre Amarela' },
    { id: 5, name: 'Tétano' }
];

app.post('/event', (req, res) => {
    const event = req.body;
    if (event.type === 'UserRegistered') {
        localVaccinationsDB.push({
            username: event.username,
            vaccines: []
        });
    }
    if (event.type === 'UserDeleted') {
        const index = localVaccinationsDB.findIndex(u => u.username === event.username);
        if (index !== -1) localVaccinationsDB.splice(index, 1);
    }
    res.status(200).send({ status: 'OK' });
});

// Todas as rotas abaixo exigem autenticação
app.use(authenticateToken);

// Helper para buscar usuário no DB local
function findUser(username) {
    return localVaccinationsDB.find(u => u.username === username);
}

app.get('/vaccinations', (req, res) => {
    const username = req.user.username;
    const user = findUser(username);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(user.vaccines);
});

app.get('/vaccinations/search', (req, res) => {
    const username = req.user.username;
    const vaccineName = req.query.vaccineName;
    if (!vaccineName) return res.status(400).json({ error: 'vaccineName é obrigatório' });

    const user = findUser(username);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    const filtered = user.vaccines.filter(v =>
        v.name.toLowerCase().includes(vaccineName.toLowerCase())
    );
    res.json(filtered);
});

app.post('/vaccinations/add', (req, res) => {
    const username = req.user.username;
    const { vaccine } = req.body;
    if (!vaccine) return res.status(400).json({ error: 'Vacina é obrigatória' });

    const user = findUser(username);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    const newVaccine = {
        id: user.vaccines.length + 1,
        ...vaccine
    };
    user.vaccines.push(newVaccine);
    res.status(201).json(newVaccine);
});

app.put('/vaccinations/update/:id', (req, res) => {
    const username = req.user.username;
    const vaccineId = parseInt(req.params.id);
    const { vaccine } = req.body;
    if (!vaccine) return res.status(400).json({ error: 'Vacina é obrigatória' });

    const user = findUser(username);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    const index = user.vaccines.findIndex(v => v.id === vaccineId);
    if (index === -1) return res.status(404).json({ error: 'Vacina não encontrada' });

    user.vaccines[index] = { ...user.vaccines[index], ...vaccine };
    res.json(user.vaccines[index]);
});

app.delete('/vaccinations/delete/:id', (req, res) => {
    const username = req.user.username;
    const vaccineId = parseInt(req.params.id);

    const user = findUser(username);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    const index = user.vaccines.findIndex(v => v.id === vaccineId);
    if (index === -1) return res.status(404).json({ error: 'Vacina não encontrada' });

    user.vaccines.splice(index, 1);
    res.sendStatus(200);
});

// Essas rotas não exigem autenticação
app.get('/vaccines', (req, res) => {
    res.json(localVaccinesDB);
});

app.post('/vaccines/add', (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Nome da vacina é obrigatório' });

    const newVaccine = {
        id: localVaccinesDB.length + 1,
        name
    };
    localVaccinesDB.push(newVaccine);
    res.status(201).json(newVaccine);
});



const port = 3000;
app.listen(port, () => {
    console.clear();
    console.log(`'Search Vaccine Service' running at port ${port}`);
});
