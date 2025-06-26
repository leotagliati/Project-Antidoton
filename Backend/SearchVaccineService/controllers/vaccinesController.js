const { localVaccinesDB } = require('../services/vaccineService.js');

exports.getAllVaccines = (req, res) => {
    res.json(localVaccinesDB);
};

exports.addVaccine = (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Nome da vacina é obrigatório' });

    const newVaccine = {
        id: localVaccinesDB.length + 1,
        name
    };
    localVaccinesDB.push(newVaccine);
    res.status(201).json(newVaccine);
};
