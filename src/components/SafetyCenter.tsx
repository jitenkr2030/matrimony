'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  Shield, 
  AlertTriangle, 
  Ban, 
  CheckCircle, 
  Eye, 
  Upload, 
  FileText,
  Lock,
  UserCheck,
  Flag,
  Users,
  Camera,
  IdCard,
  Home,
  Mail,
  Phone
} from 'lucide-react'

interface BlockedUser {
  id: string
  name: string
  reason: string
  blockedAt: string
}

interface Report {
  id: string
  reporterName: string
  reason: string
  description: string
  status: string
  createdAt: string
}

interface VerificationDoc {
  id: string
  type: string
  status: string
  adminNotes?: string
  createdAt: string
}

export default function SafetyCenter() {
  const [activeTab, setActiveTab] = useState('overview')
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([
    {
      id: '1',
      name: 'John Doe',
      reason: 'Inappropriate behavior',
      blockedAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Jane Smith',
      reason: 'Spam messages',
      blockedAt: '2024-01-10'
    }
  ])

  const [reports, setReports] = useState<Report[]>([
    {
      id: '1',
      reporterName: 'You',
      reason: 'fake_profile',
      description: 'Profile seems to be fake with stock photos',
      status: 'pending',
      createdAt: '2024-01-20'
    }
  ])

  const [verificationDocs, setVerificationDocs] = useState<VerificationDoc[]>([
    {
      id: '1',
      type: 'aadhaar',
      status: 'approved',
      createdAt: '2024-01-05'
    },
    {
      id: '2',
      type: 'pan',
      status: 'pending',
      adminNotes: 'Under review',
      createdAt: '2024-01-18'
    }
  ])

  const [newReport, setNewReport] = useState({
    reportedUserId: '',
    reason: '',
    description: ''
  })

  const [newVerification, setNewVerification] = useState({
    type: '',
    docUrl: '',
    docNumber: ''
  })

  const [showBlockDialog, setShowBlockDialog] = useState(false)
  const [blockUserId, setBlockUserId] = useState('')
  const [blockReason, setBlockReason] = useState('')

  const safetyTips = [
    {
      icon: Shield,
      title: 'Verify Profiles',
      description: 'Always look for verified badges and check profile completeness'
    },
    {
      icon: Eye,
      title: 'Video Call First',
      description: 'Schedule a video call before meeting in person'
    },
    {
      icon: Users,
      title: 'Inform Family',
      description: 'Keep your family informed about your interactions'
    },
    {
      icon: Lock,
      title: 'Protect Privacy',
      description: 'Don\'t share personal information too quickly'
    },
    {
      icon: Camera,
      title: 'Check Photos',
      description: 'Look for consistent photos across different platforms'
    },
    {
      icon: Flag,
      title: 'Report Suspicious',
      description: 'Report any suspicious behavior immediately'
    }
  ]

  const handleReport = async () => {
    // Simulate API call
    const newReportData: Report = {
      id: Date.now().toString(),
      reporterName: 'You',
      reason: newReport.reason,
      description: newReport.description,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    }
    setReports([newReportData, ...reports])
    setNewReport({ reportedUserId: '', reason: '', description: '' })
  }

  const handleBlock = async () => {
    // Simulate API call
    const newBlock: BlockedUser = {
      id: Date.now().toString(),
      name: 'User ' + blockUserId,
      reason: blockReason,
      blockedAt: new Date().toISOString().split('T')[0]
    }
    setBlockedUsers([newBlock, ...blockedUsers])
    setShowBlockDialog(false)
    setBlockUserId('')
    setBlockReason('')
  }

  const handleUnblock = (userId: string) => {
    setBlockedUsers(blockedUsers.filter(user => user.id !== userId))
  }

  const handleVerification = async () => {
    // Simulate API call
    const newDoc: VerificationDoc = {
      id: Date.now().toString(),
      type: newVerification.type,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    }
    setVerificationDocs([newDoc, ...verificationDocs])
    setNewVerification({ type: '', docUrl: '', docNumber: '' })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500'
      case 'pending': return 'bg-yellow-500'
      case 'rejected': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getReasonLabel = (reason: string) => {
    const labels: { [key: string]: string } = {
      fake_profile: 'Fake Profile',
      inappropriate_content: 'Inappropriate Content',
      harassment: 'Harassment',
      scam: 'Scam',
      spam: 'Spam',
      other: 'Other'
    }
    return labels[reason] || reason
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Shield className="w-8 h-8 mr-3 text-blue-600" />
            Safety Center
          </h1>
          <p className="text-gray-600 mt-2">Your safety is our top priority. Manage your security settings here.</p>
        </div>
        <Badge className="bg-green-500 text-white px-4 py-2">
          <CheckCircle className="w-4 h-4 mr-1" />
          Protected
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
          <TabsTrigger value="blocked">Blocked Users</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="tips">Safety Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Verification Status</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Partially Verified</div>
                <p className="text-xs text-muted-foreground">2 of 3 documents approved</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Blocked Users</CardTitle>
                <Ban className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{blockedUsers.length}</div>
                <p className="text-xs text-muted-foreground">Users you've blocked</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reports Filed</CardTitle>
                <Flag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reports.length}</div>
                <p className="text-xs text-muted-foreground">Reports you've submitted</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Profile verified</p>
                    <p className="text-xs text-gray-500">Aadhaar verification approved</p>
                  </div>
                  <span className="text-xs text-gray-500">2h ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Report submitted</p>
                    <p className="text-xs text-gray-500">Fake profile report under review</p>
                  </div>
                  <span className="text-xs text-gray-500">1d ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">User blocked</p>
                    <p className="text-xs text-gray-500">Blocked user for inappropriate behavior</p>
                  </div>
                  <span className="text-xs text-gray-500">3d ago</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setShowBlockDialog(true)}
                >
                  <Ban className="w-4 h-4 mr-2" />
                  Block a User
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setActiveTab('verification')}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Verification Document
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setActiveTab('reports')}
                >
                  <Flag className="w-4 h-4 mr-2" />
                  Report a User
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="verification" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Verification Document</CardTitle>
              <CardDescription>
                Upload government-issued documents to verify your identity and increase trust
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="docType">Document Type</Label>
                  <Select value={newVerification.type} onValueChange={(value) => setNewVerification({...newVerification, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aadhaar">Aadhaar Card</SelectItem>
                      <SelectItem value="pan">PAN Card</SelectItem>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="photo_id">Photo ID</SelectItem>
                      <SelectItem value="address_proof">Address Proof</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="docNumber">Document Number</Label>
                  <Input
                    id="docNumber"
                    value={newVerification.docNumber}
                    onChange={(e) => setNewVerification({...newVerification, docNumber: e.target.value})}
                    placeholder="Enter document number"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="docUrl">Document URL</Label>
                <Input
                  id="docUrl"
                  value={newVerification.docUrl}
                  onChange={(e) => setNewVerification({...newVerification, docUrl: e.target.value})}
                  placeholder="Enter document URL or upload file"
                />
              </div>
              <Button onClick={handleVerification} className="w-full">
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Verification Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {verificationDocs.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="font-medium capitalize">{doc.type.replace('_', ' ')}</p>
                        <p className="text-sm text-gray-500">Uploaded {doc.createdAt}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(doc.status)}>
                        {doc.status}
                      </Badge>
                      {doc.adminNotes && (
                        <span className="text-sm text-gray-500">{doc.adminNotes}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blocked" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Blocked Users</CardTitle>
              <CardDescription>
                Users you've blocked won't be able to see your profile or contact you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {blockedUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Ban className="w-5 h-5 text-red-500" />
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">Blocked on {user.blockedAt}</p>
                        <p className="text-sm text-gray-600">Reason: {user.reason}</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleUnblock(user.id)}
                    >
                      Unblock
                    </Button>
                  </div>
                ))}
                {blockedUsers.length === 0 && (
                  <p className="text-center text-gray-500 py-8">No blocked users</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Report a User</CardTitle>
              <CardDescription>
                Report users who violate our community guidelines
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="reportReason">Reason for Report</Label>
                <Select value={newReport.reason} onValueChange={(value) => setNewReport({...newReport, reason: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fake_profile">Fake Profile</SelectItem>
                    <SelectItem value="inappropriate_content">Inappropriate Content</SelectItem>
                    <SelectItem value="harassment">Harassment</SelectItem>
                    <SelectItem value="scam">Scam</SelectItem>
                    <SelectItem value="spam">Spam</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="reportDescription">Description</Label>
                <Textarea
                  id="reportDescription"
                  value={newReport.description}
                  onChange={(e) => setNewReport({...newReport, description: e.target.value})}
                  placeholder="Please provide details about your report..."
                  rows={4}
                />
              </div>
              <Button onClick={handleReport} className="w-full">
                <Flag className="w-4 h-4 mr-2" />
                Submit Report
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Flag className="w-5 h-5 text-yellow-500" />
                      <div>
                        <p className="font-medium">{getReasonLabel(report.reason)}</p>
                        <p className="text-sm text-gray-600">{report.description}</p>
                        <p className="text-xs text-gray-500">Reported {report.createdAt}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                  </div>
                ))}
                {reports.length === 0 && (
                  <p className="text-center text-gray-500 py-8">No reports submitted</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tips" className="space-y-6">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Always prioritize your safety when interacting with others online. Follow these guidelines to protect yourself.
            </AlertDescription>
          </Alert>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {safetyTips.map((tip, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <tip.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{tip.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{tip.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Emergency Contacts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="font-medium">Emergency Helpline</p>
                      <p className="text-sm text-gray-600">1091 (Women's Helpline)</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Police</p>
                      <p className="text-sm text-gray-600">100</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-medium">Support Email</p>
                      <p className="text-sm text-gray-600">support@soulmatch.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-purple-500" />
                    <div>
                      <p className="font-medium">Safety Team</p>
                      <p className="text-sm text-gray-600">Available 24/7</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Block User Dialog */}
      <Dialog open={showBlockDialog} onOpenChange={setShowBlockDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Block User</DialogTitle>
            <DialogDescription>
              Enter the user ID and reason for blocking this user.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="blockUserId">User ID</Label>
              <Input
                id="blockUserId"
                value={blockUserId}
                onChange={(e) => setBlockUserId(e.target.value)}
                placeholder="Enter user ID to block"
              />
            </div>
            <div>
              <Label htmlFor="blockReason">Reason</Label>
              <Textarea
                id="blockReason"
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                placeholder="Why are you blocking this user?"
                rows={3}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowBlockDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleBlock}>
                <Ban className="w-4 h-4 mr-2" />
                Block User
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}