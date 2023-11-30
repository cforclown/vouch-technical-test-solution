import { Router } from 'express';
import { ChannelsController } from './messages.controller';
import { ExplorationPayloadSchema, RequestHandler, validateBody, validateParams } from '../../utils';
import { createGroupPayloadSchema, updateGroupPayloadSchema } from './channels.dto';
import { idSchema } from '../../schemas';

export const CHANNELS_ROUTER_INSTANCE_NAME = 'channelsRouter';
export const CHANNELS_BASE_API_PATH = 'channels';

export function ChannelsRouter (channelsController: ChannelsController): Router {
  const router = Router();

  /**
   * @swagger
   * /api/v1/channels/{id}:
   *      get:
   *          tags:
   *              - Channels
   *          description: Get channel
   *          responses:
   *              '200':
   *                  description: OK
   *          parameters:
   *              -   name: id
   *                  in: path
   *                  required: true
   */
  router.get('/:id', validateParams(idSchema), RequestHandler(channelsController.get));

  /**
   * @swagger
   * /api/v1/channels:
   *      get:
   *          tags:
   *              - Channels
   *          description: Get all channels
   *          responses:
   *              '200':
   *                  description: OK
   */
  router.get('/', RequestHandler(channelsController.getAll));

  /**
   * @swagger
   * /api/v1/channels/explore:
   *      post:
   *          tags:
   *              - Channels
   *          description: Explore channels with pagination
   *          responses:
   *              '200':
   *                  description: OK
   *          requestBody:
   *              description: "Exploration payload"
   *              required: true
   *              content:
   *                  application/json:
   *                      schema:
   *                          $ref: '#/components/schemas/explorationPayload'
   */
  router.post('/explore', validateBody(ExplorationPayloadSchema), RequestHandler(channelsController.explore));

  /**
   * @swagger
   * /api/v1/channels:
   *      post:
   *          tags:
   *              - Channels
   *          description: Create channel
   *          responses:
   *              '200':
   *                  description: OK
   *          requestBody:
   *              description: "Create channel payload"
   *              required: true
   *              content:
   *                  application/json:
   *                      schema:
   *                          $ref: '#/components/schemas/createChannel'
   */
  router.post('/', validateBody(createGroupPayloadSchema), RequestHandler(channelsController.create));

  /**
   * @swagger
   * /api/v1/channels/{id}:
   *      patch:
   *          tags:
   *              - Channels
   *          description: Update channel
   *          responses:
   *              '200':
   *                  description: OK
   *          requestBody:
   *              description: "Update channel payload"
   *              required: true
   *              content:
   *                  application/json:
   *                      schema:
   *                          $ref: '#/components/schemas/updateChannel'
   */
  router.patch('/:id', validateParams(idSchema), validateBody(updateGroupPayloadSchema), RequestHandler(channelsController.update));

  /**
   * @swagger
   * /api/v1/channels:
   *      delete:
   *          tags:
   *              - Channels
   *          description: Delete channel
   *          responses:
   *              '200':
   *                  description: OK
   *          parameters:
   *              -   name: id
   *                  in: path
   *                  required: true
   */
  router.delete('/:id', RequestHandler(channelsController.delete));

  return router;
}
