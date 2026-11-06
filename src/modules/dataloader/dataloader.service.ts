import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { db } from '../../prisma/db.js';

@Injectable({ scope: Scope.REQUEST })
export class DataloaderService {
  readonly skillsByProfileId = new DataLoader<number, any[]>(
    async (profileIds) => {
      const skills = await db.orm.public.Skill
        .where((f, fns) =>
          fns.fns.in(f.profileId, [...profileIds])
        )
        .all();
      const grouped = new Map<number, any[]>();
      profileIds.forEach((id) => grouped.set(id, []));
      skills.forEach((s) => grouped.get(s.profileId)?.push(s));
      return profileIds.map((id) => grouped.get(id) ?? []);
    },
  );

  readonly experienceByProfileId = new DataLoader<number, any[]>(
    async (profileIds) => {
      const experience = await db.orm.public.Experience
        .where((f, fns) =>
          fns.fns.in(f.profileId, [ ...profileIds ])
        )
        .all();
      const grouped = new Map<number, any[]>();
      profileIds.forEach((id) => grouped.set(id, []));
      experience.forEach((e) => grouped.get(e.profileId)?.push(e));
      return profileIds.map((id) => grouped.get(id) ?? []);
    },
  );

  readonly projectsByProfileId = new DataLoader<number, any[]>(
    async (profileIds) => {
      const projects = await db.orm.public.Project
        .where((f, fns) =>
          fns.fns.in(f.profileId, [ ...profileIds ])
        )
        .all();
      const grouped = new Map<number, any[]>();
      profileIds.forEach((id) => grouped.set(id, []));
      projects.forEach((p) => grouped.get(p.profileId)?.push(p));
      return profileIds.map((id) => grouped.get(id) ?? []);
    },
  );
}
