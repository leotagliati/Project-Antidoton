const express = require('express');
const app = express();

const eventRouter = require('./routes/eventRouter');

app.use(express.json());
app.use(eventRouter);

const port = 3002;
app.listen(port, () => {
    console.clear();
    console.log('----------------------------------------------------');
    console.log(`'Event Bus' running at port ${port}`);
    console.log('----------------------------------------------------');
});
