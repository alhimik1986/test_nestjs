import { Resolver, Query, ResolveField, Parent, Args, ID } from '@nestjs/graphql';
import { Profile } from './entities/profile.entity.js';
import { ProfileService } from './profile.service.js';
import { DataloaderService } from '../dataloader/dataloader.service.js';
import { Skill } from './entities/skill.entity.js';
import { Experience } from './entities/experience.entity.js';
import { Project } from './entities/project.entity.js';
import { Int } from '@nestjs/graphql/dist/scalars/index.js';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(
    private profileService: ProfileService,
    private dataloader: DataloaderService,
  ) {}

  @Query(() => Profile, { nullable: true })
  async profiles(
    @Args('limit', { type: () => Int }) limit: number,
    @Args('offset', { type: () => Int }) offset: number,
  ) {
    return this.profileService.getProfiles(limit, offset);
  }

  @Query(() => Profile, { nullable: true })
  async profile(@Args('id', { type: () => ID }) id: number) {
    return this.profileService.getProfile(id);
  }

  @ResolveField(() => [Skill])
  async skills(@Parent() profile: Profile) {
    return this.dataloader.skillsByProfileId.load(profile.id);
  }

  @ResolveField(() => [Experience])
  async experience(@Parent() profile: Profile) {
    return this.dataloader.experienceByProfileId.load(profile.id);
  }

  @ResolveField(() => [Project])
  async projects(@Parent() profile: Profile) {
    return this.dataloader.projectsByProfileId.load(profile.id);
  }
}
