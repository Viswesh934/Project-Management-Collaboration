const express=require('express');
const org_auths = require('./routes/org_routes');
const app=express();
const mongoose= require('mongoose');
const db= require('./models/db');
const cors= require('cors');
app.use(cors());
app.use(express.json());
app.use(org_auths)


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});