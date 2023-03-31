const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const path = require('path');
const env = require('dotenv').config();
const cookieParser = require('cookie-parser');
const { auth, requiresAuth } = require('express-openid-connect');
const { initRoutes } = require('./routes');
const session = require('express-session');

const PORT = process.env.PORT || 3000;
const config = {
    authRequired: false,
    idpLogout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
    routes: {
        login: false,
    },
};
app.use(auth(config));

app.set('view engine', 'ejs');
app.set('views', 'views/partials');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    secret: 'mi string secreto que debe ser un string aleatorio muy largo, no como éste', 
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
    saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));

app.set(cookieParser('name', 'value', { sameSite: 'none', secure: true }));

initRoutes(app);

app.listen(PORT, () => { console.log(`Server listening in http://localhost:${PORT}`); })