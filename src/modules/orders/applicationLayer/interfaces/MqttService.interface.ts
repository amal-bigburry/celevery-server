export interface IMqttService {
  publish(data): Promise<string>;
}