import mongoose from 'mongoose'
const mongoURI = "mongodb://localhost:27017/flo";

const connectToMongo = ()=>{
    mongoose
    .connect(mongoURI)
    .then(() => {
        console.log("Connected to MongoDB!")
    })
}

export default connectToMongo;