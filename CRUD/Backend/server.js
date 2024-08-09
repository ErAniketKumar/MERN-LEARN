const express = require('express');
const app = express();
const router = require('./routes/thisRouter'); // The path to your router file
const PORT = process.env.PORT || 5000;
const dotenv = require('dotenv');

const cors = require('cors');
app.use(cors());

dotenv.config();
app.use(express.json());

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.use(router)
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
