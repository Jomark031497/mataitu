import { format } from "date-fns";

export const toFormattedDate = (date: Date) => {
  return format(new Date(date), "MMM dd, yyyy");
};

export default toFormattedDate;
