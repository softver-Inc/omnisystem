import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World from users! tast";
  }

  handlerUserCreated(data: any) {
    console.log("user created on users-services: ", data);
  }
}
