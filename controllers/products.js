import { Products } from '../models/index';

const getAllProducts = (req, res) => {
  Products
    .find({})
    .then(products => res.json(products))
    .catch(err => {
      console.log(err);
      res.status(400).end('Failed load products');
    });
};

const getProductById = (req, res, next) => {
  req.model = Products;
  next();
};

const saveNewProduct = (req, res, next) => {
  req.model = new Products(req.body);
  next();
};

const deleteProductById = (req, res, next) => {
  req.model = Products;
  next();
};

export default {
  getAllProducts,
  getProductById,
  saveNewProduct,
  deleteProductById
};
