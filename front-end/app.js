const express = require('express');
const app = express();
const path = require('path');

// app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/build/index.html'));
})

app.listen(3003, () => {
    console.log(`Frontend server is up and running! 😎`);
})