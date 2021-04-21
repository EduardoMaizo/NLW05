import { UsersService } from './../services/UserService';
import {Request, Response} from "express"

export class UsersController{

    async create(request: Request, response: Response): Promise<Response> {
        const {email} = request.body

        const usersService = new UsersService();

        const user = await usersService.create(email)

        return response.json(user);
    }
}