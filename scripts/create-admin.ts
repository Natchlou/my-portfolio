import "dotenv/config";

import { db } from "@/src/db";
import { users } from "@/src/db/schema";
import { hashPassword } from "@/src/lib/auth/password";

async function main() {
  const email = process.argv[2];
  const password = process.argv[3];

  if (!email || !password) {
    console.error("Usage: npm run admin:create -- admin@example.com password");

    process.exit(1);
  }

  const passwordHash = await hashPassword(password);

  await db.insert(users).values({
    email,
    passwordHash,
    name: "Nathan",
  });

  console.log("Administrateur créé.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
