import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { SettingsForm } from "./form";
import { formSchema } from "./validation";
import { db } from "@/src/db";
import { users } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { sessionUser } from "@/src/auth/sessionUser";
import { ZodError } from "zod";

export default async function Settings() {
  const { name, theme } = (await sessionUser()) ?? {};

  return (
    <div className="container max-w-screen-md mx-auto">
      <h1 className="text-center font-semibold text-2xl mb-4">Settings</h1>
      <SettingsForm
        defaultValues={{ name: name, theme }}
        action={async (_, data) => {
          "use server";
          try {
            formSchema.parse(data);
            const { id } = (await sessionUser()) ?? {};
            if (!id)
              return {
                status: "error",
                message: "Unauthorized",
              };
            await db
              .update(users)
              .set({
                theme: data.theme,
                name: data.name,
              })
              .where(eq(users.id, id));
            return { status: "success" };
          } catch (e) {
            if (e instanceof ZodError) {
              return {
                status: "error",
                message: "Invalid form data",
              };
            }
            return {
              status: "error",
              message: "Something went wrong.",
            };
          }
        }}
      />
    </div>
  );
}
