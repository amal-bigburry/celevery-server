/**
 * interface for document repository
 */
export interface DocumentRepository {
  getPrivacyPolicy(): Promise<string>;
  getTermsAndConditions():Promise<string>
}
