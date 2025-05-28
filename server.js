const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/login', (req, res) => {
    const { usuario, contraseña } = req.body;
    const sql = 'SELECT * FROM usuarios WHERE usuario = ? AND contraseña = ?';
    
    db.query(sql, [usuario, contraseña], (err, resultados) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error en el servidor');
        }
        if (resultados.length > 0) {
            res.send('Inicio de sesión exitoso');
        } else {
            res.send('Credenciales erróneas');
        }
    });
});

app.post('/register', (req, res) => {
    const { usuario, contraseña } = req.body;
    const sql = 'INSERT INTO usuarios (usuario, contraseña) VALUES (?, ?)';
    
    db.query(sql, [usuario, contraseña], (err, resultado) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al registrar usuario');
        }
        res.send('Usuario registrado con éxito');
    });
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
