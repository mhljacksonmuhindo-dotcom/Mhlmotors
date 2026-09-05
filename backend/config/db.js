const mongoose = require('mongoose');

module.exports = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI manquant dans le fichier .env');
  }

  const conn = await mongoose.connect(process.env.MONGODB_URI);
  console.log(`MongoDB connecté: ${conn.connection.host} / BD: ${conn.connection.name}`);
};