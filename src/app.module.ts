import { Module } from '@nestjs/common';
import { GeneratorModule } from './modules/generatorModule/generator.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [GeneratorModule, UsersModule],
})
export class AppModule {}
