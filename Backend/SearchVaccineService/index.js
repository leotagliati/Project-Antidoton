const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const localDB = [
    {
        username: 'defaultUser',
        age: 25,
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
    ,
]
app.post('/vaccines/add', (req, res) => {
    const { username, vaccine } = req.body;
    if (!username || !vaccine) {
        return res.status(400).json({ error: 'Username e vacina são obrigatórios' });
    }
    const user = localDB.find(user => user.username === username);
    if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    const newVaccine = {
        id: user.vaccines.length + 1,
        ...vaccine
    };
    user.vaccines.push(newVaccine);
    console.log(`sucessfully added vaccine with id ${newVaccine.id} for user ${username}`);
    res.status(201).json(newVaccine);
})

app.put('/vaccines/update/:id', (req, res) => {
    const { username, vaccineId, vaccine } = req.body;
    if (!username || !vaccine) {
        return res.status(400).json({ error: 'Username e vacina são obrigatórios' });
    }
    const user = localDB.find(user => user.username === username);
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
})
app.delete('/vaccines/delete/:id', (req, res) => {
    const { username } = req.body;
    const vaccineId = parseInt(req.params.id);
    if (!username) {
        return res.status(400).json({ error: 'Username é obrigatório' });
    }
    const user = localDB.find(user => user.username === username);
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
});

app.get('/vaccines', (req, res) => {
    const { username, vaccineName } = req.query;

    if (!username) {
        return res.status(400).json({ error: 'Username é obrigatório' });
    }

    const user = localDB.find(user => user.username === username);
    if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    let vaccines = user.vaccines;

    if (vaccineName) {
        vaccines = vaccines.filter(v => v.name.toLowerCase().includes(vaccineName.toLowerCase()));
    }

    res.json(vaccines);
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});