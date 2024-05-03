const app = require('./config/express');
const config = require('./config/config');
const mongoose = require('./config/mongoose');

app.listen(process.env.PORT||config.port, (req, res) => {
    console.clear();
    console.log("******************************************\n \t   Cyber Hell - Started\n******************************************");
    console.info(`Server started on port ${config.port} (${config.env})`);
});
 