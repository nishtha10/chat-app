import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Room, RoomDocument } from 'src/rooms/schemas/room.schema';
import { User, UserDocument } from 'src/users/schemas/user.schema';

@Schema({ timestamps: true })
export class Message {
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  to: UserDocument;

  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  from: UserDocument;

  @Prop({ type: SchemaTypes.String })
  message: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: Room.name })
  room: RoomDocument;

  createdAt: Date;
  updatedAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
export type MessageDocument = HydratedDocument<Message>;
