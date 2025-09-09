'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/types';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SettingsPage() {
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
          <div className="container mx-auto px-6 py-8 max-w-4xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">Settings</h1>
              <p className="text-muted-foreground mt-2">
                Manage your account settings and preferences
              </p>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your account profile information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Doe" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="john@example.com" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" defaultValue="Linkbird.ai" />
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input id="confirmPassword" type="password" />
                      </div>
                    </div>
                    
                    <Button>Save Changes</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Configure how you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-base">Email notifications</div>
                        <div className="text-sm text-muted-foreground">
                          Receive email updates about your leads and campaigns
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-base">New lead alerts</div>
                        <div className="text-sm text-muted-foreground">
                          Get notified when new leads are generated
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-base">Campaign updates</div>
                        <div className="text-sm text-muted-foreground">
                          Receive updates about campaign performance
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-base">Weekly reports</div>
                        <div className="text-sm text-muted-foreground">
                          Get weekly summary reports via email
                        </div>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-base">Marketing emails</div>
                        <div className="text-sm text-muted-foreground">
                          Receive product updates and marketing content
                        </div>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="integrations">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Connected Integrations</CardTitle>
                      <CardDescription>
                        Manage your third-party integrations
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            G
                          </div>
                          <div>
                            <div className="font-medium">Google Workspace</div>
                            <div className="text-sm text-muted-foreground">Connected</div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Disconnect</Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            L
                          </div>
                          <div>
                            <div className="font-medium">LinkedIn</div>
                            <div className="text-sm text-green-600">Connected</div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Disconnect</Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            H
                          </div>
                          <div>
                            <div className="font-medium">HubSpot</div>
                            <div className="text-sm text-muted-foreground">Not connected</div>
                          </div>
                        </div>
                        <Button size="sm">Connect</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="billing">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Current Plan</CardTitle>
                      <CardDescription>
                        Manage your subscription and billing information
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-lg font-medium">Professional Plan</div>
                          <div className="text-sm text-muted-foreground">
                            $49/month • Billed monthly
                          </div>
                        </div>
                        <Button variant="outline">Upgrade Plan</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Method</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                            VISA
                          </div>
                          <div>
                            <div className="font-medium">•••• •••• •••• 4242</div>
                            <div className="text-sm text-muted-foreground">Expires 12/2025</div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Update</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}