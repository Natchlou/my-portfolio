import { cookies } from "next/headers"
import { randomUUID } from "crypto"
import { eq } from "drizzle-orm"

import { db } from "@/src/db"
import { sessions, users } from "@/src/db/schema"

const COOKIE_NAME = "portfolio_session"

const SESSION_DURATION = 1000 * 60 * 60 * 24 * 7

export async function createSession(userId: number) {
  const id = randomUUID()

  const expiresAt = new Date(
    Date.now() + SESSION_DURATION
  )

  await db.insert(sessions).values({
    id,
    userId,
    expiresAt,
  })

  const cookieStore = await cookies()

  cookieStore.set(COOKIE_NAME, id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()

  const sessionId = cookieStore.get(COOKIE_NAME)?.value

  if (sessionId) {
    await db
      .delete(sessions)
      .where(eq(sessions.id, sessionId))
  }

  cookieStore.delete(COOKIE_NAME)
}

export async function getCurrentUser() {
  const cookieStore = await cookies()

  const sessionId = cookieStore.get(COOKIE_NAME)?.value

  if (!sessionId) {
    return null
  }

  const result = await db
    .select({
      session: sessions,
      user: users,
    })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(eq(sessions.id, sessionId))
    .limit(1)

  const record = result[0]

  if (!record) {
    return null
  }

  if (record.session.expiresAt <= new Date()) {
    await db
      .delete(sessions)
      .where(eq(sessions.id, sessionId))

    cookieStore.delete(COOKIE_NAME)

    return null
  }

  return record.user
}

export async function requireUser() {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("UNAUTHORIZED")
  }

  return user
}