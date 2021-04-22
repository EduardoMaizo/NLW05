import { io } from "../http";
import { ConnectionsService } from "../services/ConnectionsService"
import { MessagesService } from "../services/MessagesService";
import { UsersService } from "../services/UserService"

interface IParams {
    text: string;
    email: string;
}

io.on("connect", (socket) => {
    const connectionsService = new ConnectionsService();
    const usersService = new UsersService();
    const messageService = new MessagesService();
    socket.on("client_first_access", async (params) => {
        
        const socket_id = socket.id
        const { text, email } = params as IParams

        const user = await usersService.create(email)

        const connection = await connectionsService.findByUserId(user.id)

        console.log(params);

        if(!connection){
            await connectionsService.create({
                socket_id,
                user_id: user.id
            })
        } else {
            connection.socket_id = socket_id;
            await connectionsService.create(connection)
        }

        await messageService.create({
            text,
            user_id: user.id
        })

    })
});