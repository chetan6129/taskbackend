import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from 'mongoose';
import { User } from "../auth/schemas/user.schema";



@Schema({
    timestamps: true,
})
export class Task extends Document {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: () => User })
    user: mongoose.Types.ObjectId;


    @Prop({ required: true })
    name: string;

    @Prop({ default: false })
    completed: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);