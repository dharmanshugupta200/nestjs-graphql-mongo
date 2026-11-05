import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const created = new this.userModel(createUserInput);
    return created.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async update(updateUserInput: UpdateUserInput): Promise<User> {
    const { id, ...rest } = updateUserInput as any;
    const updated = await this.userModel.findByIdAndUpdate(id, rest, { new: true }).exec();
    if (!updated) throw new NotFoundException('User not found');
    return updated;
  }

  async remove(id: string): Promise<User> {
    const removed = await this.userModel.findByIdAndDelete(id).exec();
    if (!removed) throw new NotFoundException('User not found');
    return removed;
  }
}
