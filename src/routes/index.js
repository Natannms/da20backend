const bodyParser = require('body-parser');
const cors = require('cors');
const UserRoutes = require('./UserRoutes');
const PhoneRoutes = require('./PhoneRoutes');

module.exports = app =>{
    app.use(bodyParser.json());
    app.use(cors());
    app.use(UserRoutes);
    app.use(PhoneRoutes);
}
