const express = require('express');
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(cors());
app.use(express.json());

// Rotas
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

const port = 3001;
app.listen(port, () => {
    console.clear();
    console.log('-----------------------------------------------------');
    console.log(`Authentication Service is running on port ${port}`);
    console.log('-----------------------------------------------------');
});
