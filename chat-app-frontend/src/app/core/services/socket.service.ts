import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { io, Socket } from 'socket.io-client';
import { ChatMessage } from '@app/core/interface/user.interface';

@Injectable({
  providedIn: 'root'
})

export class SocketService {

  public socket$!: Socket;

  connect(roomId: string) {
    this.socket$ = io(environment.apiUrl, {
      query: {
        roomId: roomId,
      },
    });
  }

  disconnect() {
    this.socket$.on('disconnect', function () {
      console.log('user disconnected');
    });
  }

  send(event: string, message: ChatMessage) {
    console.log('Socket message:sending.....\n', message);
    this.socket$.emit(event, message);
  }

}
