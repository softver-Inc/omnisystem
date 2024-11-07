import { Body, Controller, Get, Post } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern("user_created")
  handleUserCreated(data: any) {
    this.appService.handlerUserCreated(data);
  }
}
