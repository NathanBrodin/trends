import { default as NextLink } from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { ReactNode } from "react";

import { cn } from "@/lib/utils";

const linkVariants = cva(
  "underline decoration-white/20 hover:decoration-white underline-offset-2",
  {
    variants: {
      variant: {
        default: "",
        primary:
          "inline text-accent decoration-primary/20 hover:decoration-primary/80 dark:decoration-blue-300/20 dark:hover:decoration-blue-400/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface LinkProps
  extends Omit<React.ComponentProps<typeof NextLink>, "children">,
    VariantProps<typeof linkVariants> {
  children?: ReactNode;
}

function Link({ className, variant, children, href, ...props }: LinkProps) {
  // Check if the link is external (works with SSR)
  const isExternal =
    typeof href === "string" &&
    (href.startsWith("http:") ||
      href.startsWith("https:") ||
      href.startsWith("//") ||
      href.includes("://") ||
      (href.startsWith("www.") && !href.startsWith("/")));

  const content = (
    <>
      {variant === "primary" && !isExternal ? <>{children} →</> : children}
      {isExternal && " ↗"}
    </>
  );

  return (
    <NextLink
      className={cn(linkVariants({ variant, className }))}
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      {...props}
    >
      {content}
    </NextLink>
  );
}

export { Link, linkVariants };
