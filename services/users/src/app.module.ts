import { ClientsModule, Transport } from "@nestjs/microservices";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "ANALYTICS",
        transport: Transport.TCP,
        options: { port: 3500 },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
