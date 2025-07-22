export interface ChatDataPoint {
  name: string;
  value: number;
}

export interface ChatResponse {
  text: string;
  data?: ChatDataPoint[];
}