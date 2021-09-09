export interface AnswerPayload {
  answerId?: number;
  comment?: string;
}

export interface AnswerState {
  url: string;
  answerId: string;
  comment: string;
}
