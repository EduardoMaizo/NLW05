import { response, Response } from 'express';
import { request, Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { SettingsRepository } from '../repositories/SettingsRepository';
import { SettingsService } from '../services/SettingsService';


class SettingsController {

    async create (request: Request, response: Response) {
        const { chat, username } = request.body;
        const settingsRepository = getCustomRepository(SettingsRepository);

        const settings = settingsRepository.create({
            chat,
            username
        });

        await settingsRepository.save(settings);

        return response.json(settings)
    }

    async findByUsername(request: Request, response: Response){
        const {username} = request.params;

        const settingsService = new SettingsService();

        const settings = await settingsService.findByUsername(username);

        return response.json(settings)
    }

    async update(request: Request, response: Response){
        const {username} = request.params;
        const {chat} = request.body;

        const settingsService = new SettingsService();

        const settings = await settingsService.update(username, chat);

        return response.json(settings)
    }



}

export { SettingsController }