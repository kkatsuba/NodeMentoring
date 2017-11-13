import { products } from '../models';

const getAllProducts = () => products.findAll();

const getProductById = (id) => products.findById(id);

/**
 * Reviews table not exists, so return just empty array
 * @param id
 */
const getProductReviews = async (id) => {
    return [];
};

const createNewProduct = (productData) => products.build(productData).save();

export {
    getAllProducts,
    getProductById,
    getProductReviews,
    createNewProduct
};