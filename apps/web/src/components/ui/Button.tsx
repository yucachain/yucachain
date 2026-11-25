import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

const variants = {
  primary: "btn-primary",
  lime: "btn-lime",
  clay: "btn-clay",
  ghost: "btn-ghost",
};

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof variants }) {
  return <button className={cn(variants[variant], className)} {...props} />;
}
