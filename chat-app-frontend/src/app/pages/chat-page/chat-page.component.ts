import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { AppConstants, LOADER_SET_TIMER, SET_TIMER } from '@constants/app.constant';
import { SocketService } from '@services/socket.service';
import { ChatMessage, UserDetailsModel } from '@interface/user.interface';
import { ChatService } from '@services/chat.service';
import { EncryptDecryptService } from '@services/encrypted-decrypted.service';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgSelectModule, FormsModule],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss'
})
export class ChatPageComponent implements OnInit {
  userInput = '';
  userId!: string;
  roomId!: string;
  loggedInUser!: UserDetailsModel;
  chatHistory!: ChatMessage[];

  constructor(private socketService: SocketService,
    private chatService: ChatService,
    private activatedRoute: ActivatedRoute,
    private encryptDecryptService: EncryptDecryptService
  ) {
    this.loggedInUser = this.encryptDecryptService.getDecryptedLocalStorage(AppConstants.userInfo);
    this.userId = String(this.activatedRoute.snapshot.paramMap.get('id'));
    this.roomId = String(this.activatedRoute.snapshot.paramMap.get('roomId'));
  }

  ngOnInit(): void {
    this.socketService.connect(this.userId);
    this.getChatHistory();
  }

  getChatHistory(): void {
    this.chatService.chatHistory(this.loggedInUser.id).subscribe(res => {
      this.chatHistory = res;
    })
  }

  onSubmit(): void {
    this.sendUserMessage();
    this.userInput = '';
  }

  sendUserMessage(): void {
    const message = {
      to: this.userId,
      from: this.loggedInUser.id,
      roomId: this.roomId,
      message: this.userInput
    };
    this.scrollToBottom();
    this.socketService.send('createMessage', message)
    this.getSocketInformation();
  }

  getSocketInformation(): void {
    setTimeout(() => {
      this.scrollToBottom();
      this.getChatHistory();
    }, LOADER_SET_TIMER);
  }

  scrollToBottom(): void {
    setTimeout(() => {
      window.scrollTo(0, document.documentElement.scrollHeight);
    }, SET_TIMER);
  }
}

