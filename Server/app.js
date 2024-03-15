const express = require('express')
const app = express();
const db = require('./db/dbconnection');
const memberroutes = require('./routes/memberroutes');
const organizationroutes = require('./routes/organizationroutes');

const cors = require('cors');
const cookieParser = require('cookie-parser');
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));
app.use(cookieParser());
app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.use(memberroutes);
app.use(organizationroutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000')
});