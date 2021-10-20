const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		res.render('index', {products : products});
	},
	search: (req, res) => {
		// Do the magic
		let productSearch = products.filter(contiene);
		
		// console.log('Campo: ' + req.query.keyword.toUpperCase() );
		// console.log('Busqueda: ' + productSearch);

		let collectionProd = {
			products : products.filter(contiene),
			keyword  : req.query.keyword
		};

		function contiene(p) {
			if (p.description.toUpperCase().indexOf(req.query.keyword.toUpperCase()) > -1) return p;
		}
		res.render('results', {p : collectionProd });
		// res.render('results', {products : productSearch });
	},
};

module.exports = controller;
