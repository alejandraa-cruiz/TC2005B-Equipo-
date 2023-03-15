const express = require('express');

const PORT = process.env.PORT || 3000
const app = express();

app.get('/', (req, res, next) => {
    res.send('<h1>We are running</h1>');
})

app.listen(PORT, () => { console.log(`Server listening in http://localhost:${PORT}`); })