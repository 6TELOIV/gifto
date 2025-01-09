"use client";

import { TwemojiProps } from "react-twemoji";
import ReactTwemoji from "react-twemoji";

export function Twemoji(props: TwemojiProps) {
  return (
    <ReactTwemoji
      {...props}
      options={{ ...props.options, className: "twemoji" }}
    />
  );
}
