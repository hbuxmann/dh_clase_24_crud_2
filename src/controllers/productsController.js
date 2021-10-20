const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let productoNew = 	{
	"id": 0,
	"name": null,
	"description": null,
	"price": 0,
	"discount": 0,
	"image": null,
	"category": null
   };

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', {products});
		// res.send('hola');
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let product;
		for (prod of products) {
			if (prod.id == req.params.id){
				product = prod;
				break;
			}
		}
		//res.send('pasa por acá');
		// console.log(product)
		res.render('detail', {product});
	},

	// Create - Form to create
	create: (req, res) => {		
		// res.send('crear formulario');
		res.render('product-create-form');
	},
	
	// Create -  Method to store
	store: (req, res) => {
		   let image_name = 'default-image.png';
			if (req.file) {
				image_name = req.file.filename;
			};

		   productoNew.id 		 	= (products[products.length-1].id+1); // es necesario incrementar el ID para hacerlo único
		   productoNew.name 		= req.body.name;
		   productoNew.description 	= req.body.description;
		   productoNew.price 		= req.body.price;
		   productoNew.discount		= req.body.discount;
		   productoNew.category		= req.body.category;
		   productoNew.image		= image_name;
		//    productoNew.image		= req.file.filename;		   
		//    productoNew.image		= 'default-image.png';

		   products.push(productoNew); //este paso es equivalente a INSERT en BD
		   let prdoctsJSON = JSON.stringify(products);
		   fs.writeFileSync(productsFilePath, prdoctsJSON);
		   res.render('products', {products});
			//res.send(products);

		// Do the magic
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
		let product;
		for (prod of products) {
			if (prod.id == req.params.id){
				product = prod;
				break;
			}
		}
		res.render('product-edit-form', {product});
	},
	// Update - Method to update
	update: (req, res) => {		
		//
		for (i=0; i < products.length; i++) {
			if (products[i].id == req.body.id){

				productoNew.id 				= req.body.id;
				productoNew.name 		 	= req.body.name;
				productoNew.description 	= req.body.description;
				productoNew.price 			= req.body.price;
				productoNew.discount		= req.body.discount;
				productoNew.category		= req.body.category;
				if (req.file) {
					productoNew.image =	req.file.filename;
				} else {
					productoNew.image = products[i].image;				
				}
				products[i] = productoNew;
				break;
			}
		}
		let prdoctsJSON = JSON.stringify(products);
		fs.writeFileSync(productsFilePath, prdoctsJSON);
		// res.render('products', {products}); //para que vaya a la pantalla de productos, luego de la modificación
		res.render('product-edit-form', {product : productoNew}); // se queda en el propio form y eventualmente carga la nueva imágen que hayan cargado
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
		let id = req.body.id;
		console.log("el id es:"+req.body.id);
		let productsNew = products.filter(removeID);

		let prdoctsJSON = JSON.stringify(productsNew);
		fs.writeFileSync(productsFilePath, prdoctsJSON);
		res.render('products', {products : productsNew});		

		function removeID(prod) {
			return prod.id != id;

		}
	//
	}
};

module.exports = controller;