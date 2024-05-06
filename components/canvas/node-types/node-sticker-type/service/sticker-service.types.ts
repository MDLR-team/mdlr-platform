export interface GptResponseData {
  data: {
    choices: GptChoiceItem[];
    created: number;
    id: string;
    model: string;
    object: string;
    system_fingerprint: string;
    usage: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
    };
  };
}

export interface GptChoiceItem {
  finish_reason: string;
  index: number;
  logprobs: null;
  message: {
    content: string;
    role: string;
  };
}
