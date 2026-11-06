import { Injectable } from '@nestjs/common';
import { db } from '../../prisma/db.js';

@Injectable()
export class ProfileService {
  async getProfiles(limit: number = 10, offset: number = 0) {
    return await db.orm.public.Profile.limit(limit).offset(offset).all();
  }

  async getProfile(id: number) {
    return await db.orm.public.Profile.first({ id });
  }
}
