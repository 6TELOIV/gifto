"use client";
import { schema } from "./schema";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormRootMessage,
} from "@/src/components/ui/form";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useTransition } from "react";
import { FormSubmitAction } from "@/src/actions/form";
import { Textarea } from "@/src/components/ui/textarea";

export function NewEventForm({
  defaultValues,
  action: serverAction,
}: {
  defaultValues: DefaultValues<z.infer<typeof schema>>;
  action: FormSubmitAction<z.infer<typeof schema>>;
}) {
  const [isPending, startTransition] = useTransition();
  const [actionState, action] = useActionState(serverAction, null);
  const router = useRouter();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (actionState) {
      if (actionState.status === "success") {
        router.push(`/events/${actionState.eventId}`);
      } else if (actionState.status === "error") {
        form.setError("root", { message: actionState.message });
      }
    }
  }, [actionState, form, router]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          startTransition(() => {
            action(values);
          });
        })}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex grow gap-2 justify-end">
          <Button
            disabled={isPending}
            type="button"
            onClick={router.back}
            variant="secondary"
          >
            Cancel
          </Button>
          <Button disabled={isPending} type="submit">
            Create
          </Button>
        </div>
        <FormRootMessage />
      </form>
    </Form>
  );
}
