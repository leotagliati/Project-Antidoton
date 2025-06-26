const localVaccinationsDB = [
    {
        username: 'defaultUser',
        vaccines: [
            { id: 1, name: 'COVID-19', date: '2023-05-10', dose: '1ª Dose' },
            { id: 2, name: 'Hepatite B', date: '2023-06-20', dose: '2ª Dose' },
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

function findUser(username) {
    return localVaccinationsDB.find(u => u.username === username);
}

function addUserVaccine(user, vaccine) {
    const newVaccine = {
        id: user.vaccines.length + 1,
        ...vaccine
    };
    user.vaccines.push(newVaccine);
    return newVaccine;
}

function updateUserVaccine(user, id, updatedData) {
    const index = user.vaccines.findIndex(v => v.id === id);
    if (index === -1) return null;
    user.vaccines[index] = { ...user.vaccines[index], ...updatedData };
    return user.vaccines[index];
}

function deleteUserVaccine(user, id) {
    const index = user.vaccines.findIndex(v => v.id === id);
    if (index === -1) return false;
    user.vaccines.splice(index, 1);
    return true;
}

module.exports = {
    localVaccinesDB,
    findUser,
    addUserVaccine,
    updateUserVaccine,
    deleteUserVaccine,
    localVaccinationsDB // usado pelo barramento
};
