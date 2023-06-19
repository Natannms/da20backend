const {Router} = require('express');
const ContactController = require('../controllers/ContactController');
const AuthController = require('../controllers/AuthController');
const Middlewares = require('../middleware/Middlewares');

const router = Router();

router.post("/contact", ContactController.create)
router.get("/contacts", ContactController.getAll)
router.get("/contact/:contact_id", ContactController.getOne)
router.put("/contacts/:contact_id", ContactController.update)
router.delete("/contact/:contact_id", ContactController.delete)

router.post("/login", AuthController.login);
router.get("/logout", Middlewares.init, AuthController.logout);

module.exports = router;
