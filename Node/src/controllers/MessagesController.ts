import { MessagesService } from './../services/MessagesService';
import { Repository } from 'typeorm';
import { Response, Request } from 'express';

export class MessagesController {
    async create(request: Request, response: Response){
        const {admin_id, text, user_id} = request.body;

        const messagesService = new MessagesService();

        const message = await messagesService.create({
            admin_id,
            text,
            user_id
        });

        return response.json(message);
    }

    // localhost:3333/messages/idDoUsuario
    async showByUser(request: Request, response: Response){
        const {id} = request.params;

        const messagesService = new MessagesService();

        const list = await messagesService.listByUser(id);

        return response.json(list)
    }
}