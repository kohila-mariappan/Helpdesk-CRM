const express = require('express')
const router = express.Router()
const user = require('../../controllers/adminController/users')
const validator = require('../../validator/adminValidator')

// router.post('/signUp', user.userRegister)
router.post('/login',[validator.loginValidation], user.userLogin)
router.post('/profile',[validator.profileValidation],user.profile)
router.get('/roles',user.rolesList)
router.get('/list',user.userList)
router.post('/userRoleMap',[validator.roleMappingValidation],user.userRoleMapping)
router.get('/userRoleMap/List',user.userRoleMapList)
router.post('/creation',[validator.userCreationValidation],user.userCreation)
router.post('/role/creation',[validator.roleCreationValidation],user.RoleCreation)



module.exports = router