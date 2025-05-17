/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * This class defines the SellerSupportEntity which acts as a data model encapsulating seller support information.
 * It contains three main properties:
 *  - user_id: a string uniquely identifying the seller user linked to this support entity.
 *  - message: an array of objects representing the collection of messages exchanged within the seller support context.
 *  - mqtt_topic: a string specifying the MQTT topic used for messaging and facilitating real-time communication.
 * 
 * The constructor sets these properties during object creation, ensuring each SellerSupportEntity instance
 * accurately represents a seller's support conversation and communication metadata within the system.
 */
export class SellerSupportEntity {
  constructor(
    public user_id: string,
    public message: Array<object>,
    public mqtt_topic: string,
  ) {}
}
