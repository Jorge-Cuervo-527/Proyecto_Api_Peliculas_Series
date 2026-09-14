require('dotenv').config();
const express = require ('express');
const bodyParser = require ('body-parser');
const cors = require ('cors');

const { getConnection } = require('./config/database.config');
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
var port = process.env.PORT || 5000;

getConnection();

app.use('/genero', require('./routes/generoRoute'));
app.use('/director', require('./routes/directorRoute'));
app.use('/productora', require('./routes/productoraRoute'));
app.use('/tipo', require('./routes/tipoRoute')); 
app.use('/media', require('./routes/mediaRoute'));


app.get('/', (req, res) => {
    res.json({message: 'Welcome to the backend Api'});
});

app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
});


