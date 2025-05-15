export interface UserRepository {
  finduserById(): Promise<[]>;
}
