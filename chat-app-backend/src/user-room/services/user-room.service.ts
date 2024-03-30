import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { SearchUserDto } from 'src/gateway/dtos/search-user.dto';
import { RoomDocument } from 'src/rooms/schemas/room.schema';
import { RoomsService } from 'src/rooms/services/rooms.service';
import { LoginDto } from 'src/users/dtos/login.dto';
import { UserDocument } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/services/users.service';
import { JoinResponse } from 'src/users/types';
import { GetChatListDto } from '../dtos/get-chat-list.dto';
import { ChatListResponse } from '../types';

@Injectable()
export class UserRoomService {
  constructor(
    private usersService: UsersService,
    private roomService: RoomsService,
  ) {}
  async findRoom(
    searchUserDto: SearchUserDto,
  ): Promise<{ room: RoomDocument; userToAdd: UserDocument }> {
    const loggedInUser = await this.usersService.findById(
      searchUserDto.loggedInId,
    );
    if (!loggedInUser) {
      return null;
    }
    const searchUser = await this.usersService.findOne({
      name: searchUserDto.query,
    });

    if (!searchUser) {
      return null;
    }

    const rooms = await this.roomService.find({
      users: { $all: [searchUser._id, loggedInUser._id] },
    });

    if (rooms?.length === 0) {
      const room = await this.roomService.create({
        users: [searchUser, loggedInUser],
      });
      return { room, userToAdd: searchUser };
    }

    return { room: rooms[0], userToAdd: searchUser };
  }

  async login(loginDto: LoginDto): Promise<JoinResponse> {
    let user = await this.usersService.findOne({ name: loginDto.name });

    if (!user) {
      user = await this.usersService.create({ name: loginDto.name });
    }

    await this.createRoomForUsers(user);

    return {
      id: user.id,
      name: user.name,
    };
  }

  async createRoomForUsers(loggedInUser: UserDocument): Promise<void> {
    const rooms = await this.roomService.find({
      users: { $in: [loggedInUser._id] },
    });

    if (rooms?.length !== 0) {
      return;
    }

    const users = await this.usersService.find({});

    for (const user of users) {
      if (user.id === loggedInUser.id) {
        continue;
      }
      await this.roomService.create({
        users: [loggedInUser, user],
      });
    }
  }

  async list(getChatListDto: GetChatListDto): Promise<ChatListResponse[]> {
    const loggedInUser = await this.usersService.findById(
      getChatListDto.userId,
    );

    if (!loggedInUser) {
      return [];
    }

    const rooms = await this.roomService.aggregate<{
      _id: Types.ObjectId;
      users: Partial<UserDocument>;
      createdAt: string;
      updatedAt: string;
    }>([
      {
        $match: {
          users: {
            $in: [loggedInUser._id],
          },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'users',
          foreignField: '_id',
          as: 'users',
        },
      },
      {
        $unwind: {
          path: '$users',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          'users._id': {
            $ne: loggedInUser._id,
          },
        },
      },
    ]);

    return rooms.map((room) => ({
      id: room.users?._id?.toString(),
      roomId: room?._id?.toString(),
      name: room?.users?.name,
    }));
  }
}
