import connectToMongo from './db.js';
import express from 'express'
import cors from 'cors';
import orderRoutes from './routes/order.js'

connectToMongo();
const app = express();
const port = 5000;

app.use(cors())
app.use(express.json());

// Available Routes

// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/notes', require('./routes/notes'));
app.get('/api', (req, res) => {
    res.send('Hello World!')
})
app.use('/api/orders', orderRoutes);

app.listen(port, () => {
    console.log(`Backend listening on http://localhost:${port}`)
})
