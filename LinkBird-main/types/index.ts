export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  position: string;
  phone?: string;
  linkedin?: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  source: string;
  score: number;
  tags: string[];
  notes: string;
  createdAt: Date;
  lastActivity: Date;
  campaignId?: string;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'completed' | 'draft';
  startDate: Date;
  endDate?: Date;
  targetAudience: string;
  totalLeads: number;
  qualifiedLeads: number;
  convertedLeads: number;
  budget: number;
  spent: number;
  createdAt: Date;
}

export interface DashboardStats {
  totalLeads: number;
  qualifiedLeads: number;
  convertedLeads: number;
  activeCampaigns: number;
  conversionRate: number;
  avgLeadScore: number;
  monthlyGrowth: number;
  revenue: number;
}