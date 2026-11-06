import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service.js';
import { DataloaderModule } from '../dataloader/dataloader.module.js';
import { ProfileResolver } from './profile.resolver.js';

@Module({
  imports: [DataloaderModule],
  providers: [ProfileResolver, ProfileService],
})
export class ProfileModule {}
