'use client';

import {
  LuBell,
  LuCircleUserRound,
  LuCreditCard,
  LuEllipsisVertical,
  LuLogOut,
} from 'react-icons/lu';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

import { APP_ROUTES } from '@/constants/app-routes';

import useSession from '@/hooks/use-session';

import { getNameInitials } from '@/utils/get-name-initials';

import { useRouter } from '@/i18n/navigation';

import { authClient } from '@/lib/auth-client';

export function NavUser() {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const { user } = useSession();

  const onLogout = async () => {
    await authClient.signOut();
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user?.image || ''} alt={user?.name} />
                <AvatarFallback className="rounded-lg">
                  {getNameInitials(user?.name || '')}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.name}</span>
                <span className="text-muted-foreground truncate text-xs">{user?.email}</span>
              </div>
              <LuEllipsisVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.image || ''} alt={user?.name} />
                  <AvatarFallback className="rounded-lg">
                    {getNameInitials(user?.name || '')}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.name}</span>
                  <span className="text-muted-foreground truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => router.push(APP_ROUTES.DASHBOARD.ACCOUNT)}>
                <LuCircleUserRound />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LuCreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LuBell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout}>
              <LuLogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
