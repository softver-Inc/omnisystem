import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ServicesNames } from "shared/types";

@Injectable()
export class AppService {
  private readonly users: any[] = [];

  constructor(
    @Inject(ServicesNames.Users) private readonly usersClient: ClientProxy
  ) {}

  simulateHeavyTask() {
    // Random duration between 10ms (0.01s) and 200ms (0.2s)
    const duration = Math.random() * (200 - 10) + 10;
    const endTime = Date.now() + duration;

    // Busy-wait loop to simulate a CPU-heavy task
    while (Date.now() < endTime) {
      // Do some heavy computation (in this case, nothing)
    }

    console.log(`Task completed in ${duration.toFixed(2)} ms`);
  }

  getHello(): string {
    this.simulateHeavyTask();
    console.log("execution");
    return "Hello World from api-gateway";
  }

  createUser(user: any) {
    this.users.push(user);
    this.usersClient.emit("user_created", user);
  }
}
