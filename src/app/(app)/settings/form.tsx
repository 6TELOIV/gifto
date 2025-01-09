"use client";
import { formSchema } from "./validation";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Monitor, Moon, Sun } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useTransition } from "react";
import { FormSubmitAction } from "@/src/actions/form";

const themeOptions = [
  {
    value: "system",
    label: (
      <div className="flex gap-2 items-center">
        <Monitor size="0.875rem" /> System
      </div>
    ),
  },
  {
    value: "light",
    label: (
      <div className="flex gap-2 items-center">
        <Sun size="0.875rem" /> Light
      </div>
    ),
  },
  {
    value: "dark",
    label: (
      <div className="flex gap-2 items-center">
        <Moon size="0.875rem" /> Dark
      </div>
    ),
  },
];

export function SettingsForm({
  defaultValues,
  action: serverAction,
}: {
  defaultValues: DefaultValues<z.infer<typeof formSchema>>;
  action: FormSubmitAction<z.infer<typeof formSchema>>;
}) {
  const [isPending, startTransition] = useTransition();
  const [actionState, action] = useActionState(serverAction, null);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (actionState) {
      if (actionState.status === "success") {
        router.refresh();
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
        <Card>
          <CardHeader>
            <CardTitle>
              <h2>Preferences</h2>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Theme</FormLabel>
                  <Select required onValueChange={field.onChange} {...field}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {themeOptions.map(({ label, value }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              <h2>Profile</h2>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
          </CardContent>
        </Card>
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
            Save
          </Button>
        </div>
        <FormRootMessage />
      </form>
    </Form>
  );
}
