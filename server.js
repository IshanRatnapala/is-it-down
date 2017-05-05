const express = require('express');
const PORT = 3002;
const app = express();

app.set('view-engine', 'ejs');
app.use(express.static(__dirname + '/public', { maxage: '5d' }));


require('./routes/main-routes')(app);
require('./routes/error')(app);

app.listen(PORT, () => {
    console.log('Server started on port', PORT);
});