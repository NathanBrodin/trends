"use client";

import { Button } from "./ui/button";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      {theme === "light" ? (
        <Button
          variant="secondary"
          onClick={() => {
            setTheme("dark");
          }}
        >
          Turn dark mode on
        </Button>
      ) : (
        <Button
          variant="secondary"
          onClick={() => {
            setTheme("light");
          }}
        >
          Turn light mode on
        </Button>
      )}
    </>
  );
}
