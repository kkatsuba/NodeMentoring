import {
  insertModelMiddleware,
  getByIdMiddleware,
  checkIdMiddleware,
  deleteModelMiddleware
} from '../middlewares/model-middlewares';

export default [
  {
    /**
     * @swagger
     * /api/products:
     *   get:
     *     tags:
     *       - Product
     *     summary: Get all products
     *     description: Get all products
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Success response
     *         schema:
     *           $ref: '#/definitions/ProductsResponse'
     */
    method: 'GET',
    url: '/api/products/',
    handler: 'getAllProducts'
  }, {
    /**
     * @swagger
     * /api/products/{id}:
     *   get:
     *     tags:
     *       - Product
     *     summary: Get product by id
     *     description: Get product by id
     *     parameters:
     *       - $ref: '#/parameters/id'
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Success response
     *         schema:
     *           $ref: '#/definitions/ProductResponse'
     */
    method: 'GET',
    url: '/api/products/:id',
    handler: 'getProductById',
    beforeRouteMiddleware: [ checkIdMiddleware ],
    afterRouteMiddleware: [ getByIdMiddleware ]
  }, {
    /**
     * @swagger
     * /api/products:
     *   post:
     *     tags:
     *       - Product
     *     summary: Save new produce
     *     description: Save new produce
     *     parameters:
     *       - $ref: '#/parameters/ProductNewRequest'
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Success response
     *         schema:
     *           $ref: '#/definitions/SaveResponse'
     */
    method: 'POST',
    url: '/api/products',
    handler: 'saveNewProduct',
    afterRouteMiddleware: [ insertModelMiddleware ]
  }, {
    /**
     * @swagger
     * /api/products/{id}:
     *   delete:
     *     tags:
     *       - Product
     *     summary: Delete product by id
     *     description: Delete productby id
     *     parameters:
     *       - $ref: '#/parameters/id'
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Success response
     *         schema:
     *           $ref: '#/definitions/SuccessResponse'
     */
    method: 'DELETE',
    url: '/api/products/:id',
    handler: 'deleteProductById',
    beforeRouteMiddleware: [ checkIdMiddleware ],
    afterRouteMiddleware: [ deleteModelMiddleware ]
  }
];
