export class BuyerSupportEntity {
  constructor(
    public user_id: string,
    public message: Array<object>,
    public mqtt_topic: string,
  ) {}
}
