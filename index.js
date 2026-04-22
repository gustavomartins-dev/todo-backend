const express = require('express');
const app = express();

// CORS (liberando acesso do frontend)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'HEAD, GET, POST, PATCH, DELETE');
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

const PORT = process.env.PORT || 3000;
const routes = require('./routes/routes');
app.use('/api', routes);

// CONEXÃO COM MONGODB
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://gustavo240897:123321@cluster0.bpswvmj.mongodb.net/tarefasDB?retryWrites=true&w=majority");

mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', (error) => {
  console.log(error);
});

db.once('connected', () => {
  console.log('Database Connected');
});

// SUBINDO SERVIDOR
app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});