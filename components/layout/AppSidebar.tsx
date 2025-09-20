import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ScanBarcode } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const items = [
  {
    title: "sidebar.products",
    url: "",
    icon: ScanBarcode,
  },
  // {
  //   title: "sidebar.settings",
  //   url: "/settings",
  //   icon: Settings,
  // },
];

const AppSidebar = () => {
  const t = useTranslations();
  return (
    <Sidebar variant="sidebar">
      <SidebarHeader className="items-center py-6">
        <Image
          src="/logo_extended.png"
          alt="Tecnoteca Logo"
          width={150}
          height={150}
          className="object-contain"
        />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="p-2">
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className="flex justify-between items-center"
                    >
                      <div className="flex gap-2 items-center">
                        <item.icon size={18} />
                        <span className="text-[16px] font-medium">
                          {t(item.title)}
                        </span>
                      </div>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
