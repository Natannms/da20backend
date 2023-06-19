const {Router} = require('express');
const PhoneController = require('../controllers/PhoneController');
const Middlewares = require('../middleware/Middlewares');

const router = Router();
router.post("/phone", PhoneController.create)
router.get("/phone", PhoneController.getAll)
router.get("/phone/:id", PhoneController.getOne)
router.put("/phone/:id", PhoneController.update)
router.delete("/phone/:id", PhoneController.delete)
module.exports = router;
