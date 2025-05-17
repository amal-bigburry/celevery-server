/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * This class represents the BuyerSupportEntity which serves as a data model encapsulating buyer support details.
 * It holds three primary properties:
 *  - user_id: a string uniquely identifying the buyer user associated with this support entity.
 *  - message: an array of objects representing the collection of messages exchanged within the support context.
 *  - mqtt_topic: a string indicating the MQTT topic used for messaging and real-time communication purposes.
 * 
 * The constructor initializes these properties upon instantiation, ensuring that each BuyerSupportEntity
 * instance contains all necessary data to represent a buyer's support interaction within the system.
 */
export class BuyerSupportEntity {
  constructor(
    public user_id: string,
    public message: Array<object>,
    public mqtt_topic: string,
  ) {}
}
