import { Body, Controller, Get, Post } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  createUser(@Body() createUserRequest: any) {
    this.appService.createUser(createUserRequest);
  }

  @Get("analytics")
  async getAnalytics() {
    await new Promise((r) => setTimeout(r, 300));
    return this.appService.getAnalytics();
  }
}
