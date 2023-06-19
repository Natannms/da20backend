const bodyParser = require('body-parser');
const cors = require('cors');
const ContactRoutes = require('./ContactRoutes');
const PhoneRoutes = require('./PhoneRoutes');

module.exports = app =>{
    app.use(bodyParser.json());
    app.use(cors());
    app.use(ContactRoutes);
    app.use(PhoneRoutes);
}
