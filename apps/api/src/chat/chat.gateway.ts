import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
	constructor(private readonly chatService: ChatService) {}

	handleConnection(client: Socket) {
		console.log('Cliente conectado', client.id);
	}
	handleDisconnect(client: Socket) {
		console.log('Cliente desconectado', client.id);
	}
}
