/**
 * Order status options 
 * Defines all possible states an order can be in throughout its lifecycle.
 */
const ORDER_STATUS = {
    REQUESTED: "REQUESTED", // Order has been placed but not yet processed
    CANCELLED: "CANCELLED", // Order has been cancelled by user or system
    WAITINGTOPAY: "WAITINGTOPAY", // Order is waiting for payment confirmation
    PAID: "PAID", // Payment has been successfully received
    PREPAIRING: "PREPAIRING", // Order is being prepared
    PACKED: "PACKED", // Order has been packed and is ready for shipping
    WAITINGFORPICKUP: "WAITINGFORPICKUP", // Order is awaiting pickup by delivery personnel
    UNDELIVERED: "UNDELIVERED", // Delivery attempt failed or not completed
    DELIVERED: "DELIVERED", // Order has been successfully delivered
    WAITINGTOREFUND: "WAITINGTOREFUND", // Refund process is pending
    REFUNDED: "REFUNDED" // Refund has been successfully processed
}
/**
 * Exporting the order status 
 * Makes ORDER_STATUS object available for use in other modules.
 */
export default ORDER_STATUS
