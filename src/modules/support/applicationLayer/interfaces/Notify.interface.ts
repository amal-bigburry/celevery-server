export interface Notify {
  seller(topic: string): Promise<string>;
  buyer(topic: string): Promise<string>;
}
