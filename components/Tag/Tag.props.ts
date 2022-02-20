import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface TagProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement>{
  size?: "sm"|"md",
  children:ReactNode,
  color?: "ghost"|"red"|"green"|"gray"|"primary"
}