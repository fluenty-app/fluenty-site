import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Hash } from '../../core/hash/hash';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UserDocument>,
  ) {
    //
  }

  async findByAuthUsername(username: string): Promise<User> {
    return this.usersModel
      .findOne({
        $or: [
          {email: username},
          {mobile: username},
        ],
      })
      .orFail();
  }

  async findByAuthId(id): Promise<User> {
    return this.usersModel.findOne({
      _id: new Types.ObjectId(id),
      enabled: 1,
    });
  }

  async registerUser(email: string, password: string, userData?: Record<keyof User | any, any>) {
    const data = {
      _id: new Types.ObjectId(),
      email: email,
      password: Hash.make(password),
      name: userData?.name ?? '',
      enabled: true,
    };

    const user = await this.usersModel.create(data);

    // Todo: Send confirmation email

    return user;
  }
}
