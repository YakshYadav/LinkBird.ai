'use client';

import { useState } from 'react';
import { User } from '@/types';
import { mockStats } from '@/lib/mock-data';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { LoginForm } from '@/components/auth/login-form';
import { StatsCard } from '@/components/dashboard/stats-card';
import { 
  Users, 
  Target, 
  TrendingUp, 
  Megaphone,
  DollarSign,
  Activity,
  Award,
  Zap
} from 'lucide-react';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (email: string, password: string) => {
    // Mock login
    setUser({
      id: '1',
      name: 'Pulkit Garg',
      email: email,
      role: 'admin',
      createdAt: new Date()
    });
  };

  const handleGoogleLogin = () => {
    // Mock Google login
    setUser({
      id: '1',
      name: 'Pulkit Garg',
      email: 'pulkit@kandid.ai',
      role: 'admin',
      createdAt: new Date()
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <LoginForm onLogin={handleLogin} onGoogleLogin={handleGoogleLogin} />
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
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Welcome back, {user.name}! Here's your lead generation overview.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard
                title="Total Leads"
                value={mockStats.totalLeads.toLocaleString()}
                description="from last month"
                icon={Users}
                trend={{ value: 12.5, isPositive: true }}
              />
              <StatsCard
                title="Qualified Leads"
                value={mockStats.qualifiedLeads.toLocaleString()}
                description="ready for contact"
                icon={Target}
                trend={{ value: 8.2, isPositive: true }}
              />
              <StatsCard
                title="Conversion Rate"
                value={`${mockStats.conversionRate}%`}
                description="this month"
                icon={TrendingUp}
                trend={{ value: 2.1, isPositive: true }}
              />
              <StatsCard
                title="Active Campaigns"
                value={mockStats.activeCampaigns}
                description="running now"
                icon={Megaphone}
              />
            </div>

            {/* Secondary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard
                title="Average Lead Score"
                value={mockStats.avgLeadScore}
                description="quality indicator"
                icon={Award}
                trend={{ value: 5.3, isPositive: true }}
              />
              <StatsCard
                title="Monthly Growth"
                value={`${mockStats.monthlyGrowth}%`}
                description="leads increase"
                icon={Activity}
                trend={{ value: mockStats.monthlyGrowth, isPositive: true }}
              />
              <StatsCard
                title="Revenue Generated"
                value={`$${(mockStats.revenue / 1000).toFixed(0)}k`}
                description="from converted leads"
                icon={DollarSign}
                trend={{ value: 18.7, isPositive: true }}
              />
              <StatsCard
                title="Response Rate"
                value="34.2%"
                description="email campaigns"
                icon={Zap}
                trend={{ value: 4.1, isPositive: true }}
              />
            </div>

            {/* Recent Activity Placeholder */}
            <div className="bg-card text-card-foreground rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">New qualified lead: Sarah Johnson from TechCorp</span>
                  </div>
                  <span className="text-xs text-muted-foreground">2 min ago</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Campaign "Q1 Enterprise Outreach" reached 500 leads</span>
                  </div>
                  <span className="text-xs text-muted-foreground">1 hour ago</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">Follow-up email sent to 25 prospects</span>
                  </div>
                  <span className="text-xs text-muted-foreground">3 hours ago</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Lead converted: Michael Brown - $15,000 deal</span>
                  </div>
                  <span className="text-xs text-muted-foreground">1 day ago</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
