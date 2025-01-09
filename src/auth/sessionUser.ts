import { eq } from "drizzle-orm";
import { auth } from "@/src/auth/auth";
import { db } from "@/src/db";
import { users } from "@/src/db/schema";

export type Theme = "light" | "dark" | "system";

export type User = {
  id: string;
  theme: Theme;
  name?: string;
  email?: string;
  image?: string;
};

export async function sessionUser(): Promise<User | undefined> {
  const { user: authUser } = (await auth()) ?? {};
  if (!authUser) return undefined;
  const dbUser = (
    await db
      .select({
        theme: users.theme,
        name: users.name,
        email: users.email,
        image: users.image,
      })
      .from(users)
      .where(eq(users.id, authUser.id))
  )?.[0];
  if (!dbUser) return undefined;
  return {
    id: authUser.id,
    theme: dbUser.theme ?? "system",
    name: dbUser.name ?? undefined,
    email: dbUser.email ?? undefined,
    image: dbUser.image ?? undefined,
  };
}
