import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ChatService } from '@services/chat.service';
import { EncryptDecryptService } from '@services/encrypted-decrypted.service';
import { AppConstants } from '@constants/app.constant';
import { UserDetailsModel } from '@interface/user.interface';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [MatListModule, MatIconModule, MatCardModule],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss'
})

export class ChatListComponent implements OnInit {

  userList!: UserDetailsModel[];
  constructor(private router: Router,
    private chatService: ChatService,
    private encryptDecryptService: EncryptDecryptService) { }

  ngOnInit(): void {
    const user = this.encryptDecryptService.getDecryptedLocalStorage(AppConstants.userInfo);
    console.log(user, 'user')
    this.chatService.chatList(user.id).subscribe(res => {
      this.userList = res;
      console.log(res);
    })
  }

  navigatetoChat(id: string, roomId: string): void {
    console.log(id, roomId)
    this.router.navigate([`/chat/${id}/${roomId}`])
  }
}
