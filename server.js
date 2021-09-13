const express = require('express');
const app = express();

app.get('/', (req, res) => res.json({ msg: 'Welcome to tehran exchage API ...'}));

app.use('/api/symbols', require('./routes/symbols'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server starting on port ${PORT}`));
