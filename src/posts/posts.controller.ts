import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import PostsService from './posts.service';
import CreatePostDto from './dto/createPost.dto';
import UpdatePostDto from './dto/updatePost.dto';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
import { HasRoles } from 'src/authentication/has-roles.decorator';
import { Role } from 'src/role.enum';
import { RolesGuard } from 'src/authentication/guards/roles.guard';

@Controller('posts')
export default class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.postsService.getPostById(Number(id));
  }

  @HasRoles(Role.User)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Post()
  async createPost(@Body() post: CreatePostDto) {
    return this.postsService.createPost(post);
  }

  @HasRoles(Role.User)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Patch(':id')
  async updatePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
    return this.postsService.updatePost(Number(id), post);
  }

  @HasRoles(Role.User)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(Number(id));
  }
}
