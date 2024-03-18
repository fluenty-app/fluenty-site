import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UserDocument>,
  ) {
    //
  }

  async findByAuthUsername(username: string): Promise<User> {
    return this.usersModel.findOne({
      $or: [
        {email: username},
        {mobile: username},
      ],
    });
  }
}
