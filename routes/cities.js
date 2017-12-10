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
     * /api/city/random:
     *   get:
     *     tags:
     *       - City
     *     summary: Get random city
     *     description: Get random city
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Success response
     *         schema:
     *           $ref: '#/definitions/CityResponse'
     */
    method: 'GET',
    url: '/api/city/random',
    handler: 'getRandomCity'
  }, {
    /**
     * @swagger
     * /api/city/{id}:
     *   get:
     *     tags:
     *       - City
     *     summary: Get city by id
     *     description: Get city by id
     *     parameters:
     *       - $ref: '#/parameters/id'
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Success response
     *         schema:
     *           $ref: '#/definitions/CityResponse'
     */
    method: 'GET',
    url: '/api/city/:id',
    handler: 'getCityById',
    beforeRouteMiddleware: [checkIdMiddleware],
    afterRouteMiddleware: [getByIdMiddleware]
  }, {
    /**
     * @swagger
     * /api/city:
     *   post:
     *     tags:
     *       - City
     *     summary: Save new city
     *     description: Save new city
     *     parameters:
     *       - $ref: '#/parameters/CityNewRequest'
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
    url: '/api/city',
    handler: 'saveNewCity',
    afterRouteMiddleware: [insertModelMiddleware]
  }, {
    /**
     * @swagger
     * /api/city/{id}:
     *   put:
     *     tags:
     *       - City
     *     summary: Update city by Id
     *     description: Update city by Id
     *     parameters:
     *       - $ref: '#/parameters/id'
     *       - $ref: '#/parameters/CityNewRequest'
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Success response
     *         schema:
     *           $ref: '#/definitions/CityResponse'
     */
    method: 'PUT',
    url: '/api/city/:id',
    handler: 'updateCityById',
    beforeRouteMiddleware: [checkIdMiddleware]
  }, {
    /**
     * @swagger
     * /api/city/{id}:
     *   delete:
     *     tags:
     *       - City
     *     summary: Delete city by id
     *     description: Delete city by id
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
    url: '/api/city/:id',
    handler: 'deleteCityById',
    beforeRouteMiddleware: [checkIdMiddleware],
    afterRouteMiddleware: [deleteModelMiddleware]
  }
];
