export interface OtpVerificationInterface {
  verify(UUID: string, OTP:string): Promise<object>;
}