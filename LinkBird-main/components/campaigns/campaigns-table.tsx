'use client';

import { Campaign } from '@/types';
import { mockCampaigns } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Play, 
  Pause, 
  MoreHorizontal, 
  TrendingUp, 
  Users, 
  Target,
  DollarSign
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const statusColors = {
  active: 'bg-green-100 text-green-800',
  paused: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-blue-100 text-blue-800',
  draft: 'bg-gray-100 text-gray-800'
};

const statusIcons = {
  active: Play,
  paused: Pause,
  completed: Target,
  draft: MoreHorizontal
};

export function CampaignsTable() {
  const campaigns = mockCampaigns;

  const getConversionRate = (campaign: Campaign) => {
    return campaign.totalLeads > 0 ? (campaign.convertedLeads / campaign.totalLeads * 100).toFixed(1) : '0.0';
  };

  const getBudgetUsage = (campaign: Campaign) => {
    return campaign.budget > 0 ? (campaign.spent / campaign.budget * 100) : 0;
  };

  const getQualificationRate = (campaign: Campaign) => {
    return campaign.totalLeads > 0 ? (campaign.qualifiedLeads / campaign.totalLeads * 100) : 0;
  };

  return (
    <div className="space-y-6">
      {/* Campaign Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Campaigns
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaigns.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Campaigns
            </CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {campaigns.filter(c => c.status === 'active').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Leads
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {campaigns.reduce((acc, c) => acc + c.totalLeads, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Spent
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${campaigns.reduce((acc, c) => acc + c.spent, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns Table */}
      <Card>
        <CardHeader>
          <CardTitle>Campaigns</CardTitle>
          <CardDescription>
            Manage and monitor your lead generation campaigns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Leads</TableHead>
                  <TableHead>Conversion</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign) => {
                  const StatusIcon = statusIcons[campaign.status];
                  return (
                    <TableRow key={campaign.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{campaign.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {campaign.targetAudience}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="secondary" 
                          className={statusColors[campaign.status]}
                        >
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {campaign.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Qualification</span>
                            <span>{getQualificationRate(campaign).toFixed(0)}%</span>
                          </div>
                          <Progress 
                            value={getQualificationRate(campaign)} 
                            className="h-2"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">{campaign.totalLeads.toLocaleString()}</div>
                          <div className="text-muted-foreground">
                            {campaign.qualifiedLeads} qualified
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          <span className="font-medium">{getConversionRate(campaign)}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm font-medium">
                            ${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}
                          </div>
                          <Progress 
                            value={getBudgetUsage(campaign)} 
                            className="h-1"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Campaign</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              Archive
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}