import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  private readonly analytics: any[] = [
    {
      test: "analitics",
    },
  ];

  getHello(): string {
    return "Hello World from file-manager";
  }

  handleUserCreated(data: any) {
    console.log("handlerUserCreated - ANALYTICS", data);
    this.analytics.push({
      email: data.email,
      timestamp: new Date(),
    });
  }

  getAnalytics() {
    return this.analytics;
  }
}
