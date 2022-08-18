import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './schemas/user.schema';
import { GeneratorModule } from '../generatorModule/generator.module';
import { UserActivitiesController } from './userActivities.controller';
import { UserActivitiesService } from './userActivities.service';
import { UserActivitiesMapper } from './userActivities.mapper';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.env.NODE_ENV}.env`,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    GeneratorModule,
  ],
  controllers: [UsersController, UserActivitiesController],
  providers: [UsersService, UserActivitiesService, UserActivitiesMapper],
})
export class UsersModule {}
