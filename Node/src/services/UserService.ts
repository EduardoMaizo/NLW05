import { UserRepository } from './../repositories/UsersRepository';
import { getCustomRepository, Repository } from 'typeorm';
import { User } from '../entities/User';

export class UsersService{

    private userRepository: Repository<User>

    constructor(){
        this.userRepository = getCustomRepository(UserRepository);
    }

    async create(email: string) {
        
        //Verificar se o usuario existe
        const userExist = await this.userRepository.findOne({email});

        //Se existir, retornar user
        if(userExist){
            return userExist;
        }

        //Se não existir, salvar no BD
        const user = this.userRepository.create({
            email
        });

        await this.userRepository.save(user);

        return user;
    }
}