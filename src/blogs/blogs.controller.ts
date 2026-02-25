import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IsString, MinLength } from 'class-validator';

class CommentDto {
  @IsString()
  @MinLength(1)
  content: string;
}

@UseGuards(JwtAuthGuard)
@Controller('blogs')
export class BlogsController {
  constructor(private blogsService: BlogsService) {}

  @Post()
  create(@Request() req, @Body() dto: CreateBlogDto) {
    return this.blogsService.create(req.user.id, dto);
  }

  @Get('my')
  findMyBlogs(@Request() req) {
    return this.blogsService.findMyBlogs(req.user.id);
  }

  @Patch(':id')
  update(@Request() req, @Param('id') id: string, @Body() dto: UpdateBlogDto) {
    return this.blogsService.update(req.user.id, id, dto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.blogsService.remove(req.user.id, id);
  }

  @Post(':id/like')
  like(@Request() req, @Param('id') id: string) {
    return this.blogsService.likeBlog(req.user.id, id);
  }

  @Delete(':id/like')
  unlike(@Request() req, @Param('id') id: string) {
    return this.blogsService.unlikeBlog(req.user.id, id);
  }

  @Post(':id/comments')
  addComment(@Request() req, @Param('id') id: string, @Body() dto: CommentDto) {
    return this.blogsService.addComment(req.user.id, id, dto.content);
  }

  @Get(':id/comments')
  getComments(@Param('id') id: string) {
    return this.blogsService.getComments(id);
  }
}