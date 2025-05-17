export interface UpdateKnownForOfCakeUseCase {
  execute(cake_id:string, known_for:string): Promise<string>;
}