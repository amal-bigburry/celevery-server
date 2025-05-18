/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */
/**
 * interface for document repository
 */
export interface DocumentRepository {
  /**
   * retrieves the privacy policy content
   */
  getPrivacyPolicy(): Promise<object>;
  /**
   * retrieves the terms and conditions content
   */
  getTermsAndConditions(): Promise<object>;
}
