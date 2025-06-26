const express = require('express');
const cors = require('cors');
const authenticateToken = require('./middlewares/authenticateMiddleware');


const vaccinationsRoutes = require('./routes/vaccinationsRoutes');
const vaccinesRoutes = require('./routes/vaccinesRoutes');
const handleEvent = require('./events/eventHandler');

const app = express();
app.use(cors());
app.use(express.json());

// Event Bus (sem autenticação)
app.post('/event', handleEvent);

// Rotas públicas (sem token)
app.use(vaccinesRoutes);

// Rotas protegidas
app.use(authenticateToken);
app.use(vaccinationsRoutes);

const port = 3000;
app.listen(port, () => {
    console.clear();
    console.log(`'Search Vaccine Service' running at port ${port}`);
});
