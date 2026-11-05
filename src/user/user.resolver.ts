import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserModel } from './models/user.model';
import { Types } from 'mongoose';
@Resolver(() => UserModel)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserModel], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => UserModel, { name: 'user' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid ID format');
    }
    return this.userService.findOne(id);
  }

  @Mutation(() => UserModel)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    // console.log('=================',createUserInput)
    return this.userService.create(createUserInput);
  }

  @Mutation(() => UserModel)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput);
  }

  @Mutation(() => UserModel)
  removeUser(@Args('id', { type: () => ID }) id: string) {
    return this.userService.remove(id);
  }
}
