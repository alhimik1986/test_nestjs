import { Temporal } from 'temporal-polyfill';
import { db } from './db.js';

async function runSeed() {
  const profile = await db.orm.public.Profile.create({
    name: 'Николай Сидорович',
    description:
      'Full-stack разработчик с более, чем 12-летним опытом. Специализируюсь на TypeScript, Node.js, NestJS и GraphQL. Люблю чистую архитектуру и оптимизацию запросов к БД.',
    url: 'https://github.com/ivan-ivanov',
  });

  await db.orm.public.Skill.createAll([
    { name: 'TypeScript', profileId: profile.id },
    { name: 'Node.js', profileId: profile.id },
    { name: 'NestJS', profileId: profile.id },
    { name: 'GraphQL', profileId: profile.id },
    { name: 'Prisma', profileId: profile.id },
    { name: 'PostgreSQL', profileId: profile.id },
    { name: 'Docker', profileId: profile.id },
    { name: 'Angular 2', profileId: profile.id },
    { name: 'Yii 2', profileId: profile.id },
    { name: 'Laravel', profileId: profile.id },
    { name: 'HTML', profileId: profile.id },
    { name: 'CSS', profileId: profile.id },
  ]);

  await db.orm.public.Experience.createAll([
    {
      company: 'Tech Corp',
      position: 'Senior Backend Developer',
      startDate: Temporal.PlainDate.from('2022-01-01'),
      endDate: null,
      achievements: `Спроектировал и внедрил GraphQL API с оптимизацией вложенных запросов.
        Снизил время ответа API на 40% за счёт JOIN-стратегии Prisma.
        Настроил CI/CD и Docker-окружение для команды из 8 человек.`,
      profileId: profile.id,
    },
    {
      company: 'StartupX',
      position: 'Backend Developer',
      startDate: Temporal.PlainDate.from('2020-03-01'),
      endDate: Temporal.PlainDate.from('2021-12-31'),
      achievements: `Разработал микросервис аутентификации на NestJS.
        Внедрил Prisma ORM и миграции в существующий проект`,
      profileId: profile.id,
    },
  ]);

  await db.orm.public.Project.createAll([
    {
      name: 'Digital Business Card',
      url: 'https://example.com/card',
      profileId: profile.id,
    },
    {
      name: 'Task Manager',
      url: 'https://github.com/ivanpetrov/task-manager',
      profileId: profile.id,
    },
  ]);
}


runSeed()
    .catch((error: unknown) => {
        throw error;
    })
    .finally(async () => {
        await db.close();
    });
