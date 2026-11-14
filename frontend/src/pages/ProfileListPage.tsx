import { useQuery } from '@apollo/client/react';
import { Link } from 'react-router-dom';
import { GET_PROFILES } from '../graphql/queries.js';
import React from 'react';

export function ProfileListPage() {
  const { data, loading, error } = useQuery(
    GET_PROFILES,
    {
      variables: {
        limit: 10,
        offset: 0,
      },
    }
  );

  if (loading) return <p>Загрузка профилей…</p>;
  if (error) return <p>Ошибка1: {error.message}</p>;

  const profiles = data?.profiles ?? [];

  if (profiles.length === 0) {
    return <p>Профили не найдены. Убедитесь, что база данных заполнена.</p>;
  }

  return (
    <section>
      <h1>Специалисты</h1>
      <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 16 }}>
        {profiles.map((profile) => (
          <li
            key={profile.id}
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: 8,
              padding: 16,
            }}
          >
            <Link
              to={`/profile/${profile.id}`}
              style={{ textDecoration: 'none', color: '#111827' }}
            >
              <h2 style={{ margin: '0 0 8px' }}>{profile.name}</h2>
              <p style={{ margin: 0, color: '#4b5563' }}>
                {profile.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
