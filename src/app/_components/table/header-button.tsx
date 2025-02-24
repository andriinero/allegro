import { Column } from "@tanstack/react-table";
import type { LucideIcon } from "lucide-react";
import { Button } from "../ui/button";

type HeaderButtonProps = {
  column: Column<any>;
  icon: LucideIcon;
  children: React.ReactNode;
};

export default function HeaderButton({
  column,
  icon: Icon,
  children,
}: HeaderButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="p-0 text-xs [&_svg]:size-3"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      <span className="mr-1">{children}</span>
      <Icon className="size-3" />
    </Button>
  );
}
