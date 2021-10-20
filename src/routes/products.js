// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

// ************ File Administration ************

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = path.join(__dirname, '../../public/images/products');        
        cb(null, folder);

    },
    filename: function (req, file, cb) {
        let imageName = Date.now()+path.extname(file.originalname);
        
        // console.log('Nombre de la imagen a guardar: '+imageName);
        // console.log('Nombre de la imagen original'+file.originalname);
        cb(null, imageName);
    }
});

var uploadFile = multer({ storage: storage })
   
// console.log('uploadFile: ' + uploadFile.destination);
// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 
router.get('/detail/:id', productsController.detail); //agregado hb


// /*** CREATE ONE PRODUCT ***/ 
// router.post('/product/create', productsController.create); 
router.get('/create', productsController.create);
router.post('/', uploadFile.single('image') , productsController.store);  



// /*** EDIT ONE PRODUCT ***/ 
// router.put('/:id/product', productsController.edit); 
router.get('/edit/:id', productsController.edit);
//router.put('/:id', productsController.update); 
router.put('/:id', uploadFile.single('image') ,  productsController.update); 

// /*** GET ONE PRODUCT ***/ 
router.get('/:id/', productsController.detail); 


// /*** DELETE ONE PRODUCT***/ 
// router.delete('/:id', productsController.destroy); 
router.delete('/delete/:id', productsController.destroy); 


module.exports = router;
