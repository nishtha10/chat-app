import { Injectable } from '@nestjs/common';
import { HistoryList } from '../types';
import { UsersService } from 'src/users/services/users.service';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from '../schemas/message.schema';
import { Model } from 'mongoose';

@Injectable()
export class MessagesService {
  constructor(
    private usersService: UsersService,
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}
  async getHistoryList(userId: string): Promise<HistoryList[]> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      return [];
    }
    const history = await this.messageModel
      .find({
        $or: [{ to: user._id }, { from: user._id }],
      })
      .sort({ createdAt: 1 })
      .populate(['to', 'from', 'room']);

    return history.map((data) => ({
      createdAt: data.createdAt.toDateString(),
      updatedAt: data.updatedAt.toDateString(),
      from: data.from?.id,
      message: data.message,
      roomId: data.room?.id,
      to: data?.to?.id,
    }));
  }

  async createMessage(data: Partial<Message>): Promise<MessageDocument> {
    return this.messageModel.create(data);
  }
}
