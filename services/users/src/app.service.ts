import type { Data } from './../../../shared/types';
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  private readonly users: any[] = [];

  constructor(@Inject("ANALYTICS") private readonly analyticsClient: any) {}

  getHello(): string {
    return "Hello World from users!";
  }

  createUser(createUserRequest: Data) {
    this.users.push(createUserRequest);

    this.analyticsClient.emit("user_created", {
      email: "erick@softver-tech.com",
    });
  }

  getAnalytics() {
    return this.analyticsClient.send({ cmd: "get_analytics" }, {});
  }
}
