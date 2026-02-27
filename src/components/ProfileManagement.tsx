'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  User, 
  Camera, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  Heart,
  BookOpen,
  Briefcase,
  Users,
  Shield,
  Eye,
  EyeOff,
  Save,
  Upload,
  X,
  Plus,
  Star,
  CheckCircle
} from 'lucide-react'

export default function ProfileManagement() {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    age: 0,
    height: '',
    weight: '',
    bloodGroup: '',
    complexion: '',
    physicalStatus: '',
    maritalStatus: '',
    children: 0,
    country: 'India',
    state: '',
    city: '',
    pincode: '',
    willingToRelocate: false,
    religion: '',
    caste: '',
    subCaste: '',
    motherTongue: '',
    canSpeakLanguages: '',
    vegetarian: false,
    drinking: '',
    smoking: '',
    education: '',
    educationField: '',
    occupation: '',
    occupationType: '',
    company: '',
    income: '',
    workLocation: '',
    familyType: '',
    familyValues: '',
    familyStatus: '',
    fatherOccupation: '',
    motherOccupation: '',
    brothers: 0,
    sisters: 0,
    marriedBrothers: 0,
    marriedSisters: 0,
    aboutMe: '',
    hobbies: '',
    interests: '',
    lifestyle: '',
    diet: '',
    exercise: '',
    showPhone: false,
    showEmail: false,
    showIncome: false,
    photoPrivacy: 'public',
    contactPrivacy: 'premium'
  })

  const [partnerPreferences, setPartnerPreferences] = useState({
    preferredAgeMin: '',
    preferredAgeMax: '',
    preferredHeightMin: '',
    preferredHeightMax: '',
    preferredReligion: '',
    preferredCaste: '',
    preferredEducation: '',
    preferredOccupation: '',
    preferredIncome: '',
    preferredLocation: '',
    maritalStatusPref: ''
  })

  const [photos, setPhotos] = useState([
    { id: 1, url: '/api/placeholder/200/250', isPrimary: true, caption: 'My photo' },
    { id: 2, url: '/api/placeholder/200/250', isPrimary: false, caption: 'Professional photo' }
  ])

  const [profileStrength, setProfileStrength] = useState(75)
  const [saving, setSaving] = useState(false)

  const calculateProfileStrength = () => {
    let strength = 0
    const fields = Object.keys(profile)
    const filledFields = fields.filter(field => {
      const value = profile[field as keyof typeof profile]
      return value !== '' && value !== null && value !== undefined
    })
    
    strength = (filledFields.length / fields.length) * 100
    return Math.round(strength)
  }

  const handleProfileUpdate = (field: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handlePreferenceUpdate = (field: string, value: any) => {
    setPartnerPreferences(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSaveProfile = async () => {
    setSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setProfileStrength(calculateProfileStrength())
    setSaving(false)
  }

  const addPhoto = () => {
    const newPhoto = {
      id: photos.length + 1,
      url: '/api/placeholder/200/250',
      isPrimary: false,
      caption: ''
    }
    setPhotos([...photos, newPhoto])
  }

  const removePhoto = (id: number) => {
    setPhotos(photos.filter(photo => photo.id !== id))
  }

  const setPrimaryPhoto = (id: number) => {
    setPhotos(photos.map(photo => ({
      ...photo,
      isPrimary: photo.id === id
    })))
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Profile Strength */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="w-5 h-5 mr-2 text-yellow-500" />
            Profile Strength
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Profile Completion</span>
              <span className="text-sm font-bold">{profileStrength}%</span>
            </div>
            <Progress value={profileStrength} className="h-2" />
            <p className="text-sm text-gray-600">
              Complete your profile to get better matches and more visibility
            </p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="family">Family</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        {/* Basic Information */}
        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Personal Information
              </CardTitle>
              <CardDescription>Tell us about yourself</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={profile.firstName}
                    onChange={(e) => handleProfileUpdate('firstName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profile.lastName}
                    onChange={(e) => handleProfileUpdate('lastName', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={profile.dateOfBirth}
                    onChange={(e) => handleProfileUpdate('dateOfBirth', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={profile.age}
                    onChange={(e) => handleProfileUpdate('age', parseInt(e.target.value))}
                    readOnly
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    value={profile.height}
                    onChange={(e) => handleProfileUpdate('height', e.target.value)}
                    placeholder="e.g., 170"
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    value={profile.weight}
                    onChange={(e) => handleProfileUpdate('weight', e.target.value)}
                    placeholder="e.g., 65"
                  />
                </div>
                <div>
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                  <Select value={profile.bloodGroup} onValueChange={(value) => handleProfileUpdate('bloodGroup', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="maritalStatus">Marital Status</Label>
                  <Select value={profile.maritalStatus} onValueChange={(value) => handleProfileUpdate('maritalStatus', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="never_married">Never Married</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                      <SelectItem value="widowed">Widowed</SelectItem>
                      <SelectItem value="awaiting_divorce">Awaiting Divorce</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="children">Children</Label>
                  <Input
                    id="children"
                    type="number"
                    value={profile.children}
                    onChange={(e) => handleProfileUpdate('children', parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="aboutMe">About Me</Label>
                <Textarea
                  id="aboutMe"
                  value={profile.aboutMe}
                  onChange={(e) => handleProfileUpdate('aboutMe', e.target.value)}
                  placeholder="Tell us about yourself, your personality, what you're looking for..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Photos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Camera className="w-5 h-5 mr-2" />
                Photos
              </CardTitle>
              <CardDescription>Add your photos to increase profile visibility</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {photos.map((photo) => (
                  <div key={photo.id} className="relative group">
                    <img
                      src={photo.url}
                      alt="Profile"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    {photo.isPrimary && (
                      <Badge className="absolute top-2 left-2 bg-green-500">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Primary
                      </Badge>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setPrimaryPhoto(photo.id)}
                        disabled={photo.isPrimary}
                      >
                        Set Primary
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removePhoto(photo.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="border-2 border-dashed border-gray-300 rounded-lg h-32 flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
                  <div className="text-center">
                    <Plus className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">Add Photo</p>
                  </div>
                </div>
              </div>
              <Button onClick={addPhoto} variant="outline" className="w-full">
                <Upload className="w-4 h-4 mr-2" />
                Upload Photos
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Location */}
        <TabsContent value="location" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Location Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select value={profile.country} onValueChange={(value) => handleProfileUpdate('country', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="India">India</SelectItem>
                      <SelectItem value="USA">USA</SelectItem>
                      <SelectItem value="UK">UK</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="Australia">Australia</SelectItem>
                      <SelectItem value="UAE">UAE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={profile.state}
                    onChange={(e) => handleProfileUpdate('state', e.target.value)}
                    placeholder="Enter state"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={profile.city}
                    onChange={(e) => handleProfileUpdate('city', e.target.value)}
                    placeholder="Enter city"
                  />
                </div>
                <div>
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    value={profile.pincode}
                    onChange={(e) => handleProfileUpdate('pincode', e.target.value)}
                    placeholder="Enter pincode"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="willingToRelocate"
                  checked={profile.willingToRelocate}
                  onCheckedChange={(checked) => handleProfileUpdate('willingToRelocate', checked)}
                />
                <Label htmlFor="willingToRelocate">Willing to relocate for marriage</Label>
              </div>
            </CardContent>
          </Card>

          {/* Religion & Culture */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="w-5 h-5 mr-2" />
                Religion & Culture
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="religion">Religion</Label>
                  <Select value={profile.religion} onValueChange={(value) => handleProfileUpdate('religion', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select religion" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hindu">Hindu</SelectItem>
                      <SelectItem value="muslim">Muslim</SelectItem>
                      <SelectItem value="christian">Christian</SelectItem>
                      <SelectItem value="sikh">Sikh</SelectItem>
                      <SelectItem value="jain">Jain</SelectItem>
                      <SelectItem value="buddhist">Buddhist</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="caste">Caste</Label>
                  <Input
                    id="caste"
                    value={profile.caste}
                    onChange={(e) => handleProfileUpdate('caste', e.target.value)}
                    placeholder="Enter caste"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="motherTongue">Mother Tongue</Label>
                  <Select value={profile.motherTongue} onValueChange={(value) => handleProfileUpdate('motherTongue', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hindi">Hindi</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="bengali">Bengali</SelectItem>
                      <SelectItem value="tamil">Tamil</SelectItem>
                      <SelectItem value="telugu">Telugu</SelectItem>
                      <SelectItem value="marathi">Marathi</SelectItem>
                      <SelectItem value="gujarati">Gujarati</SelectItem>
                      <SelectItem value="punjabi">Punjabi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="canSpeakLanguages">Other Languages</Label>
                  <Input
                    id="canSpeakLanguages"
                    value={profile.canSpeakLanguages}
                    onChange={(e) => handleProfileUpdate('canSpeakLanguages', e.target.value)}
                    placeholder="e.g., English, Hindi"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="vegetarian"
                    checked={profile.vegetarian}
                    onCheckedChange={(checked) => handleProfileUpdate('vegetarian', checked)}
                  />
                  <Label htmlFor="vegetarian">Vegetarian</Label>
                </div>
                <div>
                  <Label htmlFor="drinking">Drinking</Label>
                  <Select value={profile.drinking} onValueChange={(value) => handleProfileUpdate('drinking', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="occasionally">Occasionally</SelectItem>
                      <SelectItem value="regularly">Regularly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="smoking">Smoking</Label>
                  <Select value={profile.smoking} onValueChange={(value) => handleProfileUpdate('smoking', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="occasionally">Occasionally</SelectItem>
                      <SelectItem value="regularly">Regularly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Education & Career */}
        <TabsContent value="education" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Education & Career
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="education">Education</Label>
                  <Select value={profile.education} onValueChange={(value) => handleProfileUpdate('education', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select education" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high_school">High School</SelectItem>
                      <SelectItem value="bachelors">Bachelors</SelectItem>
                      <SelectItem value="masters">Masters</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                      <SelectItem value="mba">MBA</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="medical">Medical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="educationField">Field of Study</Label>
                  <Input
                    id="educationField"
                    value={profile.educationField}
                    onChange={(e) => handleProfileUpdate('educationField', e.target.value)}
                    placeholder="e.g., Computer Science"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input
                    id="occupation"
                    value={profile.occupation}
                    onChange={(e) => handleProfileUpdate('occupation', e.target.value)}
                    placeholder="e.g., Software Engineer"
                  />
                </div>
                <div>
                  <Label htmlFor="occupationType">Occupation Type</Label>
                  <Select value={profile.occupationType} onValueChange={(value) => handleProfileUpdate('occupationType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="government">Government</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="self_employed">Self Employed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={profile.company}
                    onChange={(e) => handleProfileUpdate('company', e.target.value)}
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <Label htmlFor="income">Annual Income</Label>
                  <Select value={profile.income} onValueChange={(value) => handleProfileUpdate('income', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-5">Below 5 Lakh</SelectItem>
                      <SelectItem value="5-10">5-10 Lakh</SelectItem>
                      <SelectItem value="10-20">10-20 Lakh</SelectItem>
                      <SelectItem value="20-50">20-50 Lakh</SelectItem>
                      <SelectItem value="50+">Above 50 Lakh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="workLocation">Work Location</Label>
                <Input
                  id="workLocation"
                  value={profile.workLocation}
                  onChange={(e) => handleProfileUpdate('workLocation', e.target.value)}
                  placeholder="City where you work"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Family */}
        <TabsContent value="family" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Family Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="familyType">Family Type</Label>
                  <Select value={profile.familyType} onValueChange={(value) => handleProfileUpdate('familyType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="joint">Joint Family</SelectItem>
                      <SelectItem value="nuclear">Nuclear Family</SelectItem>
                      <SelectItem value="extended">Extended Family</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="familyValues">Family Values</Label>
                  <Select value={profile.familyValues} onValueChange={(value) => handleProfileUpdate('familyValues', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="traditional">Traditional</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="liberal">Liberal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="familyStatus">Family Status</Label>
                  <Select value={profile.familyStatus} onValueChange={(value) => handleProfileUpdate('familyStatus', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="poor">Poor</SelectItem>
                      <SelectItem value="middle_class">Middle Class</SelectItem>
                      <SelectItem value="upper_middle">Upper Middle Class</SelectItem>
                      <SelectItem value="rich">Rich</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fatherOccupation">Father's Occupation</Label>
                  <Input
                    id="fatherOccupation"
                    value={profile.fatherOccupation}
                    onChange={(e) => handleProfileUpdate('fatherOccupation', e.target.value)}
                    placeholder="Father's occupation"
                  />
                </div>
                <div>
                  <Label htmlFor="motherOccupation">Mother's Occupation</Label>
                  <Input
                    id="motherOccupation"
                    value={profile.motherOccupation}
                    onChange={(e) => handleProfileUpdate('motherOccupation', e.target.value)}
                    placeholder="Mother's occupation"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="brothers">Brothers</Label>
                  <Input
                    id="brothers"
                    type="number"
                    value={profile.brothers}
                    onChange={(e) => handleProfileUpdate('brothers', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="sisters">Sisters</Label>
                  <Input
                    id="sisters"
                    type="number"
                    value={profile.sisters}
                    onChange={(e) => handleProfileUpdate('sisters', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="marriedBrothers">Married Brothers</Label>
                  <Input
                    id="marriedBrothers"
                    type="number"
                    value={profile.marriedBrothers}
                    onChange={(e) => handleProfileUpdate('marriedBrothers', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="marriedSisters">Married Sisters</Label>
                  <Input
                    id="marriedSisters"
                    type="number"
                    value={profile.marriedSisters}
                    onChange={(e) => handleProfileUpdate('marriedSisters', parseInt(e.target.value))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Partner Preferences */}
        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="w-5 h-5 mr-2" />
                Partner Preferences
              </CardTitle>
              <CardDescription>Tell us what you're looking for in a partner</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="preferredAgeMin">Preferred Age Range</Label>
                  <div className="flex gap-2">
                    <Input
                      id="preferredAgeMin"
                      type="number"
                      value={partnerPreferences.preferredAgeMin}
                      onChange={(e) => handlePreferenceUpdate('preferredAgeMin', e.target.value)}
                      placeholder="Min"
                    />
                    <span className="self-center">to</span>
                    <Input
                      type="number"
                      value={partnerPreferences.preferredAgeMax}
                      onChange={(e) => handlePreferenceUpdate('preferredAgeMax', e.target.value)}
                      placeholder="Max"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="preferredHeight">Preferred Height Range (cm)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="preferredHeightMin"
                      type="number"
                      value={partnerPreferences.preferredHeightMin}
                      onChange={(e) => handlePreferenceUpdate('preferredHeightMin', e.target.value)}
                      placeholder="Min"
                    />
                    <span className="self-center">to</span>
                    <Input
                      type="number"
                      value={partnerPreferences.preferredHeightMax}
                      onChange={(e) => handlePreferenceUpdate('preferredHeightMax', e.target.value)}
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="preferredReligion">Preferred Religion</Label>
                  <Select value={partnerPreferences.preferredReligion} onValueChange={(value) => handlePreferenceUpdate('preferredReligion', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any</SelectItem>
                      <SelectItem value="hindu">Hindu</SelectItem>
                      <SelectItem value="muslim">Muslim</SelectItem>
                      <SelectItem value="christian">Christian</SelectItem>
                      <SelectItem value="sikh">Sikh</SelectItem>
                      <SelectItem value="jain">Jain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="preferredCaste">Preferred Caste</Label>
                  <Input
                    id="preferredCaste"
                    value={partnerPreferences.preferredCaste}
                    onChange={(e) => handlePreferenceUpdate('preferredCaste', e.target.value)}
                    placeholder="Any specific caste preference"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="preferredEducation">Preferred Education</Label>
                  <Select value={partnerPreferences.preferredEducation} onValueChange={(value) => handlePreferenceUpdate('preferredEducation', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any</SelectItem>
                      <SelectItem value="bachelors">Bachelors</SelectItem>
                      <SelectItem value="masters">Masters</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                      <SelectItem value="mba">MBA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="preferredOccupation">Preferred Occupation</Label>
                  <Input
                    id="preferredOccupation"
                    value={partnerPreferences.preferredOccupation}
                    onChange={(e) => handlePreferenceUpdate('preferredOccupation', e.target.value)}
                    placeholder="e.g., Software Engineer, Doctor"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="preferredIncome">Preferred Income</Label>
                  <Select value={partnerPreferences.preferredIncome} onValueChange={(value) => handlePreferenceUpdate('preferredIncome', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any</SelectItem>
                      <SelectItem value="5-10">5-10 Lakh</SelectItem>
                      <SelectItem value="10-20">10-20 Lakh</SelectItem>
                      <SelectItem value="20-50">20-50 Lakh</SelectItem>
                      <SelectItem value="50+">Above 50 Lakh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="preferredLocation">Preferred Location</Label>
                  <Input
                    id="preferredLocation"
                    value={partnerPreferences.preferredLocation}
                    onChange={(e) => handlePreferenceUpdate('preferredLocation', e.target.value)}
                    placeholder="Preferred city/country"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="maritalStatusPref">Marital Status Preference</Label>
                <Select value={partnerPreferences.maritalStatusPref} onValueChange={(value) => handlePreferenceUpdate('maritalStatusPref', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any</SelectItem>
                    <SelectItem value="never_married">Never Married</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                    <SelectItem value="widowed">Widowed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Privacy Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="showPhone"
                    checked={profile.showPhone}
                    onCheckedChange={(checked) => handleProfileUpdate('showPhone', checked)}
                  />
                  <Label htmlFor="showPhone">Show phone number</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="showEmail"
                    checked={profile.showEmail}
                    onCheckedChange={(checked) => handleProfileUpdate('showEmail', checked)}
                  />
                  <Label htmlFor="showEmail">Show email address</Label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="photoPrivacy">Photo Privacy</Label>
                  <Select value={profile.photoPrivacy} onValueChange={(value) => handleProfileUpdate('photoPrivacy', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public - Everyone can see</SelectItem>
                      <SelectItem value="protected">Protected - Only connected users</SelectItem>
                      <SelectItem value="private">Private - Only me</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="contactPrivacy">Contact Privacy</Label>
                  <Select value={profile.contactPrivacy} onValueChange={(value) => handleProfileUpdate('contactPrivacy', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public - Everyone can see</SelectItem>
                      <SelectItem value="premium">Premium - Only premium users</SelectItem>
                      <SelectItem value="private">Private - Only connected users</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSaveProfile} 
          disabled={saving}
          className="bg-gradient-to-r from-pink-600 to-purple-600"
        >
          {saving ? (
            <>Saving...</>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Profile
            </>
          )}
        </Button>
      </div>
    </div>
  )
}