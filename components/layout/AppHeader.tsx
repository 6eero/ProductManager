"use client";
import { User2 } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";
import { useAppContext } from "@/context/App";
import * as R from "ramda";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const AppHeader = () => {
  const context = useAppContext();

  const name = R.pathOr("name", ["data", "name"], context);
  const surname = R.pathOr("surname", ["data", "surname"], context);

  return (
    <header>
      <div className="p-4 w-full border-b-1 border-b-border bg-header flex justify-between">
        <SidebarTrigger />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md">
              <User2 size={18} />
              <span className="text-[16px] font-medium text-gray-500">
                {`${name} ${surname}`}
              </span>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="mt-2">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AppHeader;
