'use client';

import React from 'react';
import {
  BadgeDollarSign,
  LayoutDashboard,
  Package,
  PanelLeft,
  Search,
  Settings,
} from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from './ui/input';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import ToggleMode from './toggle-mode';

const MainNav = () => {
  const pathname = usePathname();

  return (
    <div className='flex flex-col sm:gap-4 sm:py-4'>
      <header className='sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-6 sm:static sm:h-auto sm:border-0 sm:bg-transparent'>
        <Sheet>
          <SheetTrigger asChild>
            <Button size='icon' variant='outline' className='sm:hidden'>
              <PanelLeft className='h-6 w-6' />
              <span className='sr-only'>Toggle Menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side='left' className='sm:max-w-xs'>
            <nav className='grid gap-6 text-lg font-medium'>
              <Link
                href='/'
                className={`flex items-center gap-4 px-2.5 hover:text-foreground ${
                  pathname === '/'
                    ? 'text-accent-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                <LayoutDashboard className='h-6 w-6' />
                Dashboard
              </Link>

              <Link
                href='/sales'
                className={`flex items-center gap-4 px-2.5 hover:text-foreground ${
                  pathname === '/sales'
                    ? 'text-accent-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                <BadgeDollarSign className='h-6 w-6' />
                Sales
              </Link>

              <Link
                href='/products'
                className={`flex items-center gap-4 px-2.5 hover:text-foreground ${
                  pathname === '/products'
                    ? 'text-accent-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                <Package className='h-6 w-6' />
                Products
              </Link>

              <Link
                href='/settings'
                className={`flex items-center gap-4 px-2.5 hover:text-foreground ${
                  pathname === '/settings'
                    ? 'text-accent-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                <Settings className='h-6 w-6' />
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <Breadcrumb className='hidden md:flex'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href='#'>Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href='#'>Orders</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Recent Orders</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className='relative ml-auto flex-1 md:grow-0'>
          <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            type='search'
            placeholder='Search...'
            className='w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]'
          />
        </div>
        <ToggleMode />
      </header>
    </div>
  );
};

export default MainNav;
