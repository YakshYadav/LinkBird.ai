import { Lead, Campaign, DashboardStats } from '@/types';

export const mockLeads: Lead[] = Array.from({ length: 100 }, (_, i) => ({
  id: `lead-${i + 1}`,
  name: [
    'John Smith', 'Sarah Johnson', 'Michael Brown', 'Emily Davis', 'David Wilson',
    'Jessica Garcia', 'Christopher Martinez', 'Amanda Anderson', 'Matthew Taylor', 'Ashley Thomas',
    'James Jackson', 'Jennifer White', 'Daniel Harris', 'Lisa Martin', 'Robert Thompson'
  ][i % 15],
  email: `user${i + 1}@example.com`,
  company: [
    'TechCorp Inc', 'Innovation Labs', 'Global Solutions', 'Digital Dynamics', 'Future Systems',
    'Smart Analytics', 'Cloud Ventures', 'Data Insights', 'AI Solutions', 'Tech Pioneers'
  ][i % 10],
  position: [
    'CEO', 'CTO', 'Marketing Director', 'Sales Manager', 'Product Manager',
    'VP of Engineering', 'Head of Marketing', 'Business Development', 'Operations Manager', 'Founder'
  ][i % 10],
  phone: `+1 (555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
  linkedin: `https://linkedin.com/in/user${i + 1}`,
  status: ['new', 'contacted', 'qualified', 'converted', 'lost'][Math.floor(Math.random() * 5)] as Lead['status'],
  source: ['Website', 'LinkedIn', 'Email Campaign', 'Referral', 'Cold Outreach', 'Social Media'][Math.floor(Math.random() * 6)],
  score: Math.floor(Math.random() * 100) + 1,
  tags: ['enterprise', 'high-value', 'warm-lead', 'decision-maker'].slice(0, Math.floor(Math.random() * 3) + 1),
  notes: 'Interested in enterprise solution. Follows up regularly. High engagement on social media.',
  createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
  lastActivity: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
  campaignId: Math.random() > 0.3 ? `campaign-${Math.floor(Math.random() * 5) + 1}` : undefined
}));

export const mockCampaigns: Campaign[] = [
  {
    id: 'campaign-1',
    name: 'Q1 Enterprise Outreach',
    description: 'Target enterprise clients for our premium solution',
    status: 'active',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-03-31'),
    targetAudience: 'Enterprise CTOs and VPs',
    totalLeads: 245,
    qualifiedLeads: 89,
    convertedLeads: 23,
    budget: 15000,
    spent: 8500,
    createdAt: new Date('2023-12-15')
  },
  {
    id: 'campaign-2',
    name: 'LinkedIn Lead Generation',
    description: 'Social media focused lead generation campaign',
    status: 'active',
    startDate: new Date('2024-02-01'),
    targetAudience: 'Marketing Directors',
    totalLeads: 189,
    qualifiedLeads: 67,
    convertedLeads: 12,
    budget: 8000,
    spent: 4200,
    createdAt: new Date('2024-01-20')
  },
  {
    id: 'campaign-3',
    name: 'Content Marketing Push',
    description: 'Attract leads through valuable content',
    status: 'paused',
    startDate: new Date('2024-01-15'),
    targetAudience: 'Small-Medium Business Owners',
    totalLeads: 156,
    qualifiedLeads: 45,
    convertedLeads: 8,
    budget: 5000,
    spent: 3100,
    createdAt: new Date('2024-01-10')
  },
  {
    id: 'campaign-4',
    name: 'Email Nurture Sequence',
    description: 'Multi-touch email campaign for warm leads',
    status: 'completed',
    startDate: new Date('2023-11-01'),
    endDate: new Date('2023-12-31'),
    targetAudience: 'Previous website visitors',
    totalLeads: 298,
    qualifiedLeads: 134,
    convertedLeads: 45,
    budget: 3000,
    spent: 2850,
    createdAt: new Date('2023-10-20')
  },
  {
    id: 'campaign-5',
    name: 'Trade Show Follow-up',
    description: 'Follow-up campaign for trade show contacts',
    status: 'draft',
    startDate: new Date('2024-04-01'),
    targetAudience: 'Trade show attendees',
    totalLeads: 0,
    qualifiedLeads: 0,
    convertedLeads: 0,
    budget: 10000,
    spent: 0,
    createdAt: new Date('2024-02-28')
  }
];

export const mockStats: DashboardStats = {
  totalLeads: 1247,
  qualifiedLeads: 456,
  convertedLeads: 123,
  activeCampaigns: 3,
  conversionRate: 9.9,
  avgLeadScore: 67,
  monthlyGrowth: 23.5,
  revenue: 234500
};