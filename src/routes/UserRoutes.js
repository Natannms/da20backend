const {Router} = require('express');
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');
const Middlewares = require('../middleware/Middlewares');

const router = Router();

router.post("/contact", UserController.create)
router.get("/contacts", UserController.getAll)
router.get("/contact/:contact_id", UserController.getOne)
router.put("/contacts/:contact_id", UserController.update)
router.delete("/contact/:contact_id", UserController.delete)

router.post("/login", AuthController.login);
router.get("/logout", Middlewares.init, AuthController.logout);

module.exports = router;
