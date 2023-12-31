import { Router } from 'express';
import { MessagesController } from './messages.controller';
import { RequestHandler, validateBody, validateParams } from '../../utils';
import { sendMsgPayloadSchema, startConversationPayloadSchema } from './messages.dto';
import { idSchema } from '../../schemas';

export const MESSAGES_ROUTER_INSTANCE_NAME = 'messagesRouter';
export const MESSAGES_BASE_API_PATH = 'messages';

export function MessagesRouter (messagesController: MessagesController): Router {
  const router = Router();

  /**
   * @swagger
   * /api/v1/messages/{id}:
   *      post:
   *          tags:
   *              - Messages
   *          description: Get channel all messages
   *          responses:
   *              '200':
   *                  description: OK
   *          security:
   *              - Bearer: []
   *          parameters:
   *              -   name: id
   *                  in: path
   *                  description: Channel id
   *                  required: true
   */
  router.get('/:id', validateParams(idSchema), RequestHandler(messagesController.getMsgs));

  /**
   * @swagger
   * /api/v1/messages/new:
   *      post:
   *          tags:
   *              - Messages
   *          description: Start a new conversation
   *          responses:
   *              '200':
   *                  description: OK
   *          security:
   *              - Bearer: []
   *          requestBody:
   *              description: "Start a new conversation payload"
   *              required: true
   *              content:
   *                  application/json:
   *                      schema:
   *                          $ref: '#/components/schemas/startConversation'
   */
  router.post('/new', validateBody(startConversationPayloadSchema), RequestHandler(messagesController.startConversation));

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
   *          security:
   *              - Bearer: []
   *          parameters:
   *              -   name: id
   *                  in: path
   *                  description: Channel id
   *                  required: true
   *          requestBody:
   *              description: "Send message payload"
   *              required: true
   *              content:
   *                  application/json:
   *                      schema:
   *                          $ref: '#/components/schemas/sendMsg'
   */
  router.put('/:id', validateParams(idSchema), validateBody(sendMsgPayloadSchema), RequestHandler(messagesController.sendMsg));

  /**
   * @swagger
   * /api/v1/messages/read/{id}:
   *      put:
   *          tags:
   *              - Messages
   *          description: Read messages
   *          responses:
   *              '200':
   *                  description: OK
   *          security:
   *              - Bearer: []
   *          parameters:
   *              -   name: id
   *                  in: path
   *                  description: Channel id
   *                  required: true
   */
  router.put('/read/:id', validateParams(idSchema), RequestHandler(messagesController.readMsgs));

  return router;
}
