import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Aggregate, FilterQuery, Model, PipelineStage } from 'mongoose';
import { Room, RoomDocument } from '../schemas/room.schema';

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Room.name) private roomModel: Model<Room>) {}

  async create(data: Partial<Room>): Promise<RoomDocument> {
    return this.roomModel.create(data);
  }

  async findOne(query: FilterQuery<Room>): Promise<RoomDocument> {
    return this.roomModel.findOne(query);
  }

  async find(query: FilterQuery<Room>): Promise<RoomDocument[]> {
    return this.roomModel.find(query);
  }

  async aggregate<T>(stages: PipelineStage[]): Promise<Aggregate<T[]>> {
    return this.roomModel.aggregate<T>(stages);
  }

  async findById(id: string): Promise<RoomDocument> {
    return this.roomModel.findById(id);
  }
}
