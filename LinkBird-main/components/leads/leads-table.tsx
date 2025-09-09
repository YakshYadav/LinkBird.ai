'use client';

import { useState, useEffect, useCallback } from 'react';
import { Lead } from '@/types';
import { mockLeads } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, Eye } from 'lucide-react';
import { LeadDetails } from './lead-details';

const statusColors = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  qualified: 'bg-green-100 text-green-800',
  converted: 'bg-emerald-100 text-emerald-800',
  lost: 'bg-red-100 text-red-800'
};

const LEADS_PER_PAGE = 20;

export function LeadsTable() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [displayedLeads, setDisplayedLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Initialize leads
  useEffect(() => {
    setLeads(mockLeads);
    setFilteredLeads(mockLeads);
    setDisplayedLeads(mockLeads.slice(0, LEADS_PER_PAGE));
  }, []);

  // Filter leads based on search
  useEffect(() => {
    const filtered = leads.filter(lead =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLeads(filtered);
    setDisplayedLeads(filtered.slice(0, LEADS_PER_PAGE));
    setPage(1);
  }, [searchTerm, leads]);

  // Load more leads (infinite scroll simulation)
  const loadMore = useCallback(() => {
    if (loading) return;
    
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const nextPage = page + 1;
      const startIndex = (nextPage - 1) * LEADS_PER_PAGE;
      const endIndex = startIndex + LEADS_PER_PAGE;
      const newLeads = filteredLeads.slice(startIndex, endIndex);
      
      if (newLeads.length > 0) {
        setDisplayedLeads(prev => [...prev, ...newLeads]);
        setPage(nextPage);
      }
      
      setLoading(false);
    }, 500);
  }, [filteredLeads, page, loading]);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 1000
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 font-semibold';
    if (score >= 60) return 'text-yellow-600 font-semibold';
    return 'text-red-600 font-semibold';
  };

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedLeads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="font-medium">
                  <div>
                    <div>{lead.name}</div>
                    <div className="text-sm text-muted-foreground">{lead.position}</div>
                  </div>
                </TableCell>
                <TableCell>{lead.company}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>
                  <Badge 
                    variant="secondary" 
                    className={statusColors[lead.status]}
                  >
                    {lead.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className={getScoreColor(lead.score)}>
                    {lead.score}
                  </span>
                </TableCell>
                <TableCell>{lead.source}</TableCell>
                <TableCell>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedLead(lead)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="w-[600px] sm:max-w-[600px]">
                      <SheetHeader>
                        <SheetTitle>Lead Details</SheetTitle>
                        <SheetDescription>
                          Detailed information about {lead.name}
                        </SheetDescription>
                      </SheetHeader>
                      {selectedLead && <LeadDetails lead={selectedLead} />}
                    </SheetContent>
                  </Sheet>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground mt-2">Loading more leads...</p>
        </div>
      )}

      {/* End of results */}
      {!loading && displayedLeads.length >= filteredLeads.length && filteredLeads.length > 0 && (
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground">
            Showing all {filteredLeads.length} leads
          </p>
        </div>
      )}
    </div>
  );
}