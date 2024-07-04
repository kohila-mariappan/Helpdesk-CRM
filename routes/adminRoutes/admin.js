const express = require('express')
const router = express.Router()
const admin = require('../../controllers/adminController/admin')
const validator = require('../../validator/adminValidator')
const {projectIdValidation} = require('../../validator/projectValidator')


router.post('/module/create',[validator.ModuleValidation],admin.createModule)
router.get('/module/list',admin.getModulesList)
router.post('/module/update',[validator.UpdateModuleValidation],admin.updateModule)

router.post('/screen/create',[validator.ScreenValidation],admin.createScreen)
router.get('/screen/list',admin.getScreenList)
router.post('/screen/update',[validator.UpdateScreenValidation],admin.updateScreen)
router.post('/screen/moduleId',[validator.moduleScreenValidation],admin.moduleScreenList)

router.post('/mapping/role',[validator.RolemoduleScreenValidation],admin.roleMapScreen)
router.get('/mapping/list',admin.roleMapScreenList)
router.get('/excel/download',admin.exportExcel)



router.post('/dashboard',[projectIdValidation],admin.dasboard)



module.exports = router