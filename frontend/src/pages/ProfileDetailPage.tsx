import { skipToken, useQuery } from '@apollo/client/react';
import { Link, useParams } from 'react-router-dom';
import { GET_PROFILE } from '../graphql/queries.js';
import React from 'react';

export function ProfileDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useQuery(
    GET_PROFILE,
    id
      ? {
          variables: { id: Number(id) },
        }
      : skipToken,
  );

  if (!id) return <p>Некорректный идентификатор профиля.</p>;
  if (loading) return <p>Загрузка профиля…</p>;
  if (error) return <p>Ошибка: {error.message}</p>;
  if (!data?.profile) return <p>Профиль не найден.</p>;

  const profile = data.profile;

  return (
    <article>
      <Link to="/" style={{ color: '#2563eb', textDecoration: 'none' }}>
        ← Назад к списку
      </Link>

      <h1 style={{ marginTop: 16 }}>{profile.name}</h1>
      <p style={{ color: '#4b5563', fontSize: 18 }}>{profile.description}</p>

      <section style={{ marginTop: 24 }}>
        <h2>Навыки</h2>
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            listStyle: 'none',
            padding: 0,
          }}
        >
          {profile.skills.map((skill) => (
            <li
              key={skill.id}
              style={{
                background: '#f3f4f6',
                padding: '4px 10px',
                borderRadius: 999,
              }}
            >
              {skill.name}
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Опыт работы</h2>
        {profile.experience.map((exp) => (
          <div
            key={exp.id}
            style={{
              marginBottom: 16,
              borderLeft: '3px solid #2563eb',
              paddingLeft: 12,
            }}
          >
            <h3 style={{ margin: 0 }}>
              {exp.position} — {exp.company}
            </h3>
            {/*<p style={{ margin: '4px 0', color: '#6b7280', fontSize: 14 }}>
              {new Date(exp.startDate).toLocaleDateString()} —{' '}
              {exp.endDate
                ? new Date(exp.endDate).toLocaleDateString()
                : 'наст. время'}
            </p>*/}
            <p>{exp.achievements}</p>
          </div>
        ))}
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Проекты</h2>
        <ul>
          {profile.projects.map((project) => (
            <li key={project.id} style={{ marginBottom: 8 }}>
              <strong>{project.name}</strong>
              {project.url && (
                <>
                  {' '}
                  ·{' '}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    демо
                  </a>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
