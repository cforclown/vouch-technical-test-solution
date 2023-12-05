import { Router } from 'express';
import { ChannelsController } from './channels.controller';
import { explorationPayloadSchema, RequestHandler, validateBody, validateParams } from '../../utils';
import { createGroupDtoSchema, updateGroupDtoSchema } from './channels.dto';
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
  router.get('/', RequestHandler(channelsController.getUserChannels));

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
  router.post('/explore', validateBody(explorationPayloadSchema), RequestHandler(channelsController.explore));

  /**
   * @swagger
   * /api/v1/channels/group:
   *      post:
   *          tags:
   *              - Channels
   *          description: Create group
   *          responses:
   *              '200':
   *                  description: OK
   *          requestBody:
   *              description: "Create group"
   *              required: true
   *              content:
   *                  application/json:
   *                      schema:
   *                          $ref: '#/components/schemas/createGroup'
   */
  router.post('/group', validateBody(createGroupDtoSchema), RequestHandler(channelsController.createGroup));

  /**
   * @swagger
   * /api/v1/channels/group{id}:
   *      patch:
   *          tags:
   *              - Channels
   *          description: Update group
   *          responses:
   *              '200':
   *                  description: OK
   *          requestBody:
   *              description: "Update group payload"
   *              required: true
   *              content:
   *                  application/json:
   *                      schema:
   *                          $ref: '#/components/schemas/upgradeGroup'
   */
  router.patch('/group/:id', validateParams(idSchema), validateBody(updateGroupDtoSchema), RequestHandler(channelsController.createGroup));

  /**
   * @swagger
   * /api/v1/channels/{id}:
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
  router.delete('/:id', validateParams(idSchema), RequestHandler(channelsController.delete));

  return router;
}
