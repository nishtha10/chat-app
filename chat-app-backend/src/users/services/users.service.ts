import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { SearchUserDto } from 'src/gateway/dtos/search-user.dto';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(query: FilterQuery<User>): Promise<UserDocument> {
    return this.userModel.findOne(query);
  }

  async create(data: Partial<User>): Promise<UserDocument> {
    return this.userModel.create(data);
  }

  async getJoinId(searchUserDto: SearchUserDto): Promise<string> {
    const searchedUser = await this.userModel.findOne({
      name: searchUserDto.query,
    });

    if (!searchUserDto) {
      return null;
    }

    const loggedInUser = await this.userModel.findById(
      searchUserDto.loggedInId,
    );

    if (!loggedInUser) {
      return null;
    }

    return searchedUser.id;
  }

  async findById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id);
  }

  async find(query: FilterQuery<User>): Promise<UserDocument[]> {
    return this.userModel.find(query);
  }
}
