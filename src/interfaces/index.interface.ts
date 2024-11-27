export interface TranslateResponse{
    status: string;
    message: string;
}

export interface Message{
    text: string;
    ai?:boolean; // Indicate if the message is from the AI
}