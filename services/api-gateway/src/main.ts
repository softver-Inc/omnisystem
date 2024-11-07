import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";

import { Transport } from "@nestjs/microservices";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: 3500,
    },
  });

  await app.startAllMicroservices();
  await app.listen(4000);

  console.log("api gateway");
}

bootstrap();
