import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
// import { SeederModule } from './seeder/seeder.module';
import { SeederService } from './seeder/seeder.service';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const seeder = app.get(SeederService);
  await seeder.seed();
  const whiteList = <string>app.get(ConfigService).get('corsOriginList');
  app.enableCors({
    origin: whiteList.split(','),
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
  });
  const config = new DocumentBuilder()
    .setTitle('Training')
    .setDescription('Training API description')
    .setVersion('1.0')
    .addTag('training')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const port = app.get(ConfigService).get('port');
  await app.listen(port);
}
bootstrap();
