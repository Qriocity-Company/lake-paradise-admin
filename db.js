const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://negiaditya1234:aditya@cluster0.ijycvxo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      
    });
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

module.exports = connectToMongo;
