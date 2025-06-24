const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const localDB = [
  { id: 1, name: 'COVID-19', date: '2023-05-10', dose: '1ª Dose' },
  { id: 2, name: 'Hepatite B', date: '2023-06-20', dose: '2ª Dose' },
]

app.get('/vaccines', (req, res) => {
    res.json(localDB);
});


app.listen(3000, () => {  console.log('Server is running on port 3000');
});