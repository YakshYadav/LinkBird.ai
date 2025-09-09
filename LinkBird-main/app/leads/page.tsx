'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/types';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { LeadsTable } from '@/components/leads/leads-table';

export default function LeadsPage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Mock authentication check
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin' as const,
      createdAt: new Date()
    };
    setUser(mockUser);
  }, []);

  const handleLogout = () => {
    setUser(null);
    router.push('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar onLogout={handleLogout} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} onLogout={handleLogout} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
          <div className="container mx-auto px-6 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">Leads</h1>
              <p className="text-muted-foreground mt-2">
                Manage and track your lead generation prospects
              </p>
            </div>

            <LeadsTable />
          </div>
        </main>
      </div>
    </div>
  );
}