'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  LayoutDashboard, 
  Users, 
  Megaphone, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  Bird,
  LogOut
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Leads', href: '/leads', icon: Users },
  { name: 'Campaigns', href: '/campaigns', icon: Megaphone },
  { name: 'Settings', href: '/settings', icon: Settings },
];

interface SidebarProps {
  onLogout: () => void;
}

export function Sidebar({ onLogout }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div className={cn(
      'flex h-screen flex-col border-r bg-background transition-all duration-300',
      collapsed ? 'w-16' : 'w-64'
    )}>
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4">
        {!collapsed && (
          <Link href="/" className="flex items-center space-x-2">
            <Bird className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Linkbird.ai</span>
          </Link>
        )}
        {collapsed && (
          <Bird className="h-8 w-8 text-primary mx-auto" />
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      <Separator />
      
      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? 'secondary' : 'ghost'}
                size="sm"
                className={cn(
                  'w-full justify-start',
                  collapsed && 'px-2'
                )}
              >
                <Icon className={cn('h-4 w-4', !collapsed && 'mr-3')} />
                {!collapsed && item.name}
              </Button>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4">
        <Separator className="mb-4" />
        <Button
          variant="ghost"
          size="sm"
          onClick={onLogout}
          className={cn(
            'w-full justify-start text-destructive hover:text-destructive',
            collapsed && 'px-2'
          )}
        >
          <LogOut className={cn('h-4 w-4', !collapsed && 'mr-3')} />
          {!collapsed && 'Logout'}
        </Button>
      </div>
    </div>
  );
}