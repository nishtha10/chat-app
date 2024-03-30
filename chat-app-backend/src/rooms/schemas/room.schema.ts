import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

@Schema({ timestamps: true })
export class Room {
  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: User.name }] })
  users: User[];

  @Prop()
  latestMessage: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
export type RoomDocument = HydratedDocument<Room>;
