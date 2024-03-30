import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_ROUTES } from "@app/core/constants/app.constant";
import { ChatMessage, UserDetailsModel } from "@app/core/interface/user.interface";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root',
})
export class ChatService {

    constructor(private httpClient: HttpClient) { }

    chatList(userId: string): Observable<UserDetailsModel[]> {
        return this.httpClient.post<UserDetailsModel[]>(API_ROUTES.chatListApi, { userId })
    }

    chatHistory(userId: string): Observable<ChatMessage[]> {
        return this.httpClient.post<ChatMessage[]>(API_ROUTES.chatHistoryApi, { userId })
    }
}
