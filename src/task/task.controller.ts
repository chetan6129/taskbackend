import { Controller, Post, UseGuards, Patch, Body, Param, Req, Get, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CreateTaskDto } from './task.dto';


@Controller('task')

export class TaskController {
    constructor(private taskService: TaskService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() createTaskDto: CreateTaskDto, @Req() req) {
        const user = req.user;
        console.log('User:', user);
        return this.taskService.create({ ...createTaskDto, user: user._id });
    }
    
    @Get()
    @UseGuards(JwtAuthGuard)
    async get(@Req() req) {
        return await this.taskService.getTasks(req.user);
    }
    
    @Patch('/:taskId')
    @UseGuards(JwtAuthGuard)
    async updateTaskById(@Param('taskId') taskId: string, @Body() updatePayload: any) {
        return await this.taskService.updateTaskById(taskId, updatePayload);
    }

    @Delete('/:taskId')
    @UseGuards(JwtAuthGuard)
    async deleteTaskById(@Param('taskId') taskId: string) {
        return await this.taskService.deleteTaskById(taskId);
    }


}
