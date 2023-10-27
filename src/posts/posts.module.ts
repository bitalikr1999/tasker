import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { PostsService } from './posts.service';

@Module({
  imports: [UsersModule],
  providers: [PostsService],
})
export class PostsModule {}
