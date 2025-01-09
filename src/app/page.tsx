import { signInAction, signOutAction } from "@/src/actions/session";
import { auth } from "@/src/auth/auth";
import { Button } from "@/src/components/ui/button";
import { Gift } from "lucide-react";

export default async function Home() {
  const loggedIn = Boolean(await auth());
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-5xl flex gap-2">
          Gifto <Gift size="3rem" />
        </h1>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          {loggedIn ? (
            <form action={signOutAction} className="flex gap-2">
              <Button type="submit" variant="secondary">
                Sign out
              </Button>
              <Button asChild>
                <a href="/dashboard">Dashboard</a>
              </Button>
            </form>
          ) : (
            <form action={signInAction}>
              <Button type="submit">
                <img src="/google.svg" alt="" className="w-4 h-4" />
                <span>Sign in</span>
              </Button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
