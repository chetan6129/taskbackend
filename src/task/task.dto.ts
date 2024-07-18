import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
export class CreateTaskDto {
    @IsNotEmpty()
    name: string;

    completed?: boolean;
    
    @IsNotEmpty()
    user: string; // Add this line if you need to explicitly define user in the DTO
}
