import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

export const formatDate = (i: string) => {
   return moment(i).format("MMM Do YY");
};

export const truncateText = (str: string, limit: number) => {
   if (str.length > limit) {
     return str.slice(0, limit) + "...";
   }
   return str;
 };