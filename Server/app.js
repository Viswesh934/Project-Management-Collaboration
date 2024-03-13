const express = require('express')
const app = express();
const db = require('./db/dbconnection');
const memberroutes = require('./routes/memberroutes');
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:5173'
  }));
app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.use(memberroutes);


app.listen(3000, () => {
    console.log('Server is running on port 3000')
});