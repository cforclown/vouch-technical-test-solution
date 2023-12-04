import { Router } from 'express';
import { MessagesController } from './messages.controller';
import { explorationPayloadSchema, RequestHandler, validateBody, validateParams } from '../../utils';
import { sendMsgPayloadSchema, startConversationPayloadSchema } from './messages.dto';
import { idSchema } from '../../schemas';

export const ROUTER_INSTANCE_NAME = 'messagesRouter';
export const BASE_API_PATH = 'messages';

export function MessagesRouter (messagesController: MessagesController): Router {
  const router = Router();

  /**
   * @swagger
   * /api/v1/messages:
   *      post:
   *          tags:
   *              - Messages
   *          description: Explore messages with pagination
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
  router.post('/', validateBody(explorationPayloadSchema), RequestHandler(messagesController.getMsgs));

  /**
   * @swagger
   * /api/v1/messages:
   *      post:
   *          tags:
   *              - Messages
   *          description: Start a new conversation
   *          responses:
   *              '200':
   *                  description: OK
   *          requestBody:
   *              description: "Start a new conversation payload"
   *              required: true
   *              content:
   *                  application/json:
   *                      schema:
   *                          $ref: '#/components/schemas/sendMsg'
   */
  router.put('/', validateBody(startConversationPayloadSchema), RequestHandler(messagesController.startConversation));

  /**
   * @swagger
   * /api/v1/messages/{id}:
   *      put:
   *          tags:
   *              - Messages
   *          description: Send message
   *          responses:
   *              '200':
   *                  description: OK
   *          requestBody:
   *              description: "Send message payload"
   *              required: true
   *              content:
   *                  application/json:
   *                      schema:
   *                          $ref: '#/components/schemas/sendMsg'
   */
  router.put('/:id', validateParams(idSchema), validateBody(sendMsgPayloadSchema), RequestHandler(messagesController.sendMsg));

  return router;
}
