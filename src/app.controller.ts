import { Controller, Get } from "@nestjs/common";

@Controller()
export class WelcomeController {
  constructor(
  ) {}

  /**
   * GET endpoint for retrieving all hero records.
   * This route is protected using JwtAuthGuard to ensure that only authenticated users can access it.
   * The method calls the GetHerosUseCase class to perform the business logic of fetching hero data from the repository.
   * Returns an array of hero entities upon successful authorization and execution.
   *
   * Company: Bigburry Hypersystems LLP
   */
  @Get()
  async welcome() {
    return "Welcome to the Celevery API's";
  }
}