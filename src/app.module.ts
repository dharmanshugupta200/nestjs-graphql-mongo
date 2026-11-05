// src/app.module.ts
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      path: '/finduser',
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
    }),

    MongooseModule.forRoot('mongodb://localhost:27017/nest_graphql_demo'),

    UserModule,
  ],
})
export class AppModule {}
