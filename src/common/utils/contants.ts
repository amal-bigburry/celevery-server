/**
 * Order status options
 * Defines all possible states an order can be in throughout its lifecycle.
 */
export const ORDER_STATUS = {
  REQUESTED: 'REQUESTED', // Order has been placed but not yet processed
  CANCELLED: 'CANCELLED', // Order has been cancelled by user or system
  WAITING_TO_PAY: 'WAITING_TO_PAY', // Order is waiting for payment confirmation
  ORDERED: 'ORDERED', // Payment has been successfully received
  PREPARING: 'PREPARING', // Order is being prepared
  PACKED: 'PACKED', // Order has been packed and is ready for shipping
  WAITING_FOR_PICKUP: 'WAITING_FOR_PICKUP', // Order is awaiting pickup by delivery personnel
  UNDELIVERED: 'UNDELIVERED', // Delivery attempt failed or not completed
  DELIVERED: 'DELIVERED', // Order has been successfully delivered
  REFUND_INITIATED: 'REFUND_INITIATED', // Refund process is pending
  REFUNDED: 'REFUNDED', // Refund has been successfully processed
};

export const STORE_STATUS = {
  REQUESTED: 'REQUESTED',
  APPROVED: 'APPROVED',
  SUSPENDED: 'SUSPENDED',
  PAYMENTPENDING: 'PAYMENTPENDING',
  REREQUEST: 'REREQUEST',
};

export const STORE_WARNINGS = {
  REQUESTED: 'We are reviewing your store. Mostly it takes less that 24 hours.',
  OPEN: 'Store is Open',
  CLOSE: 'Store is closed',
  SUSPENDED: `Your account has been suspended due to a violation of our terms or unusual activity,
Access to certain features may be restricted.
If you believe this is a mistake or need assistance, please contact support at 
support@example.com.
`,
  PAYMENTPENDING: 'Your Payment is pending',
  REREQUEST: 'Your Request has been Rejected',
};
