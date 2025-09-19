"use client";
import { LogOut, User2 } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";
import { useAppContext } from "@/context/App";
import * as R from "ramda";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import CustomButton from "../buttons/CustomButton";
import { APP_VERSION } from "@/version";

const AppHeader = () => {
  const context = useAppContext();

  const name = R.pathOr("name", ["data", "name"], context);
  const surname = R.pathOr("surname", ["data", "surname"], context);
  const email = R.pathOr("email@email.com", ["data", "email"], context);
  const username = R.pathOr("username", ["data", "username"], context);

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

          <DropdownMenuContent className="mt-1 mr-4 flex flex-col gap-8 items-center justify-center p-6">
            <div className="flex flex-col gap-1 items-center justify-center">
              <span className="text-[16px] font-medium text-foreground">
                {`${username}`}
              </span>
              <span className="text-[16px] font-medium text-gray-400">
                {`${email}`}
              </span>
            </div>
            <div className="w-full flex flex-col gap-3 items-center justify-center">
              <CustomButton
                disabled
                className="w-full"
                text="generic.log_out"
                icon={<LogOut />}
              />
              <span className="text-[12px] font-medium text-gray-400">
                v{APP_VERSION}
              </span>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AppHeader;
