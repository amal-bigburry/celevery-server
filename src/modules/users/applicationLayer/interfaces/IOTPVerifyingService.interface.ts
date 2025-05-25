export interface IOTPVerifyingService {
  verify(UUID: string, OTP:string): Promise<boolean>;
}