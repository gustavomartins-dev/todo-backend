const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());

const PORT = process.env.PORT || 3000;
const routes = require('./routes/routes');
app.use('/api', routes);

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

app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});