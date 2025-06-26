const { findUser, addUserVaccine, updateUserVaccine, deleteUserVaccine } = require('../services/vaccineService.js');

exports.getAllVaccinations = (req, res) => {
    const user = findUser(req.user.username);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(user.vaccines);
};

exports.searchVaccines = (req, res) => {
    const user = findUser(req.user.username);
    const vaccineName = req.query.vaccineName;
    if (!vaccineName) return res.status(400).json({ error: 'vaccineName é obrigatório' });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    const filtered = user.vaccines.filter(v =>
        v.name.toLowerCase().includes(vaccineName.toLowerCase())
    );
    res.json(filtered);
};

exports.addVaccine = (req, res) => {
    const user = findUser(req.user.username);
    const { vaccine } = req.body;
    if (!vaccine) return res.status(400).json({ error: 'Vacina é obrigatória' });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    const newVaccine = addUserVaccine(user, vaccine);
    res.status(201).json(newVaccine);
};

exports.updateVaccine = (req, res) => {
    const user = findUser(req.user.username);
    const { vaccine } = req.body;
    const vaccineId = parseInt(req.params.id);

    if (!vaccine) return res.status(400).json({ error: 'Vacina é obrigatória' });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    const updated = updateUserVaccine(user, vaccineId, vaccine);
    if (!updated) return res.status(404).json({ error: 'Vacina não encontrada' });

    res.json(updated);
};

exports.deleteVaccine = (req, res) => {
    const user = findUser(req.user.username);
    const vaccineId = parseInt(req.params.id);

    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    const deleted = deleteUserVaccine(user, vaccineId);
    if (!deleted) return res.status(404).json({ error: 'Vacina não encontrada' });

    res.sendStatus(200);
};
