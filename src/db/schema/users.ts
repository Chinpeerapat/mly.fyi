import { sql } from 'drizzle-orm';
import { text, sqliteTable, integer, index } from 'drizzle-orm/sqlite-core';

export const allowedAuthProvider = ['github', 'google', 'email'] as const;

export const users = sqliteTable(
  'users',
  {
    id: text('id').unique().primaryKey(),
    name: text('name', {
      length: 255,
    }).notNull(),
    email: text('email').notNull(),
    password: text('password').notNull(),
    isEnabled: integer('is_enabled', {
      mode: 'boolean',
    })
      .notNull()
      .default(true),
    authProvider: text('auth_provider', {
      enum: allowedAuthProvider,
    }).notNull(),
    verificationCode: text('verification_code').unique(),
    verificationCodeAt: text('verification_code_at'),
    resetPasswordCode: text('reset_password_code').unique(),
    resetPasswordCodeAt: text('reset_password_code_at'),
    verifiedAt: integer('verified_at', { mode: 'timestamp' }),
    createdAt: integer('created_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (users) => ({
    emailIdx: index('email_idx').on(users.email),
  }),
);
