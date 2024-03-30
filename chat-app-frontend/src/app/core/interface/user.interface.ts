export interface UserDetailsModel {
    id: string;
    name: string;
    roomId: string;
}

export interface ChatMessage {
    to: string;
    from: string;
    roomId: string;
    message: string;
}