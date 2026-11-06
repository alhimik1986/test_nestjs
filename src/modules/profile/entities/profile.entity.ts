import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Skill } from './skill.entity.js';
import { Experience } from './experience.entity.js';
import { Project } from './project.entity.js';

@ObjectType()
export class Profile {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  url: string;

  @Field(() => [Skill])
  skills: Skill[];

  @Field(() => [Experience])
  experience: Experience[];

  @Field(() => [Project])
  projects: Project[];
}
