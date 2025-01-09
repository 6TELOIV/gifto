import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Send } from "lucide-react";
import { Twemoji } from "@/src/components/twemoji";

export default function Page() {
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="flex lg:flex-[2] flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>
              <h2>2024 GIFT(O) !!!</h2>
            </CardTitle>
            <CardDescription>Event details</CardDescription>
          </CardHeader>
          <CardContent>
            <Twemoji>Year two, family gifts ♥️😎🐕</Twemoji>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              <h2>Members</h2>
            </CardTitle>
            <CardDescription>
              Click a member to view their card.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button>
              Invite <Send size="1rem" />
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="flex lg:flex-[3] xl:flex-[4] flex-col gap-4">
        <Card></Card>
      </div>
    </div>
  );
}
