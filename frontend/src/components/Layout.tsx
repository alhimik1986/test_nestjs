import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export function Layout() {
  return (
    <div
      style={{
        fontFamily: 'system-ui, sans-serif',
        maxWidth: 960,
        margin: '0 auto',
        padding: 24,
      }}
    >
      <header style={{ marginBottom: 32 }}>
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            color: '#2563eb',
            fontSize: 20,
            fontWeight: 600,
          }}
        >
          Цифровая визитка
        </Link>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
