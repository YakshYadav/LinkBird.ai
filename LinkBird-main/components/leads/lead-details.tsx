import { Lead } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { 
  Mail, 
  Phone, 
  Linkedin, 
  Building, 
  User, 
  Calendar, 
  Activity,
  Edit3,
  MessageSquare
} from 'lucide-react';

interface LeadDetailsProps {
  lead: Lead;
}

const statusColors = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  qualified: 'bg-green-100 text-green-800',
  converted: 'bg-emerald-100 text-emerald-800',
  lost: 'bg-red-100 text-red-800'
};

export function LeadDetails({ lead }: LeadDetailsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6 py-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-2xl font-bold">{lead.name}</h3>
          <p className="text-muted-foreground">{lead.position} at {lead.company}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className={statusColors[lead.status]}>
            {lead.status}
          </Badge>
          <div className="text-right">
            <div className={`text-2xl font-bold ${getScoreColor(lead.score)}`}>
              {lead.score}
            </div>
            <div className="text-xs text-muted-foreground">Score</div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{lead.email}</span>
            </div>
            {lead.phone && (
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{lead.phone}</span>
              </div>
            )}
            {lead.linkedin && (
              <div className="flex items-center space-x-3">
                <Linkedin className="h-4 w-4 text-muted-foreground" />
                <a href={lead.linkedin} className="text-blue-600 hover:underline">
                  LinkedIn Profile
                </a>
              </div>
            )}
            <div className="flex items-center space-x-3">
              <Building className="h-4 w-4 text-muted-foreground" />
              <span>{lead.company}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lead Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Lead Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Source</label>
              <p className="text-sm">{lead.source}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Created</label>
              <p className="text-sm">{lead.createdAt.toLocaleDateString()}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Last Activity</label>
              <p className="text-sm">{lead.lastActivity.toLocaleDateString()}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Campaign</label>
              <p className="text-sm">{lead.campaignId || 'None'}</p>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <label className="text-sm font-medium text-muted-foreground">Tags</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {lead.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={lead.notes}
            readOnly
            className="min-h-[100px] resize-none"
          />
          <div className="flex justify-end mt-4">
            <Button size="sm" variant="outline">
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Notes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex space-x-2 pt-4">
        <Button>
          <Mail className="h-4 w-4 mr-2" />
          Send Email
        </Button>
        <Button variant="outline">
          <Phone className="h-4 w-4 mr-2" />
          Schedule Call
        </Button>
        <Button variant="outline">
          <Edit3 className="h-4 w-4 mr-2" />
          Update Status
        </Button>
      </div>
    </div>
  );
}