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
     * /api/user/{id}:
     *   get:
     *     tags:
     *       - User
     *     summary: Get user by id
     *     description: Get user by id
     *     parameters:
     *       - $ref: '#/parameters/id'
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Success response
     *         schema:
     *           $ref: '#/definitions/UserResponse'
     */
    method: 'GET',
    url: '/api/user/:id',
    handler: 'getUserById',
    beforeRouteMiddleware: [checkIdMiddleware],
    afterRouteMiddleware: [getByIdMiddleware]
  }, {
    /**
     * @swagger
     * /api/user:
     *   post:
     *     tags:
     *       - User
     *     summary: Save new user
     *     description: Save new user
     *     parameters:
     *       - $ref: '#/parameters/UserNewRequest'
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
    url: '/api/user',
    handler: 'saveNewUser',
    afterRouteMiddleware: [insertModelMiddleware]
  }, {
    /**
     * @swagger
     * /api/user/{id}:
     *   delete:
     *     tags:
     *       - User
     *     summary: Delete user
     *     description: Delete user
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
    url: '/api/user/:id',
    handler: 'deleteUserById',
    beforeRouteMiddleware: [checkIdMiddleware],
    afterRouteMiddleware: [deleteModelMiddleware]
  }
];
