const express = require('express')
const router = express.Router();
const Controller = require('../Controllers/Controller');
const UserController = require('../Controllers/UserController');
const PatrimonyController = require('../Controllers/PatrimonyController');
const RoomDepartmentController = require('../Controllers/RoomDepartmentController');
const upload = require('../middlewares/upload');
const jwtVerifier = require('../middlewares/verifyJWT');
// Migração:
router.get('/migration', Controller.CreateTable);

// Usuário:
router.post('/login', UserController.index);
router.post('/register', UserController.create);
router.put('/update', jwtVerifier, UserController.update);
router.delete('/delete', jwtVerifier, UserController.delete);

// Patrimônio:
router.get('/:department/patrimony/:room', PatrimonyController.index);
router.post('/insertPatrimony/:id',PatrimonyController.create);

router.post('/byexcel', jwtVerifier, upload.fields([
    {name:'excel', maxCount:1},
    {name:'image', maxCount:1}
]), PatrimonyController.createByExcel);
router.put('/updatePatrimony', PatrimonyController.update);
router.delete('/deletePatrimony/:id', PatrimonyController.delete);
router.post('/:room/filterPatrimony/:department/:type',PatrimonyController.Filter);

// Salas e Departamentos:
router.get('/room', jwtVerifier, RoomDepartmentController.indexRoom);
router.get('/department', jwtVerifier, RoomDepartmentController.indexDepartment);
router.post('/room', jwtVerifier, RoomDepartmentController.createRoom);
router.post('/department', jwtVerifier, RoomDepartmentController.createDepartment);
router.put('/room', jwtVerifier, RoomDepartmentController.updateRoom);
router.put('/department', jwtVerifier, RoomDepartmentController.updateDepartment);
router.delete('/room', jwtVerifier, RoomDepartmentController.deleteRoom);
router.delete('/department', jwtVerifier, RoomDepartmentController.deleteDepartment);

module.exports = router;