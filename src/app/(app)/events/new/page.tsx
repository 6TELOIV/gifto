import { NewEventForm } from "./form";
import { schema } from "./schema";
import { db } from "@/src/db";
import { events, users, usersToEvents } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { sessionUser } from "@/src/auth/sessionUser";
import { ZodError } from "zod";

export default async function Settings() {
  const user = await sessionUser();

  return (
    <div className="container max-w-screen-md mx-auto">
      <h1 className="text-center font-semibold text-2xl mb-4">New Event</h1>
      <NewEventForm
        defaultValues={{
          description: "",
          name: "",
        }}
        action={async (_, data) => {
          "use server";
          try {
            const parsedData = schema.parse(data);
            const { id } = (await sessionUser()) ?? {};
            if (!id)
              return {
                status: "error",
                message: "Unauthorized",
              };
            const eventId = await db.transaction(async (tx) => {
              const event = (
                await tx
                  .insert(events)
                  .values({
                    ...parsedData,
                    ownerUserId: id,
                  })
                  .returning()
              )[0];
              await tx.insert(usersToEvents).values({
                eventId: event.id,
                userId: id,
              });
              return event.id;
            });
            return { status: "success", eventId };
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
