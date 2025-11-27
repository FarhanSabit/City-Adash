import React, { useState } from 'react';
import Sidebar, { SidebarProvider, useSidebar } from '../../components/Sidebar';
import MobileMenuButton from '../../components/MobileMenuButton';
import AlertCounter from '../../components/ui/AlertCounter';
import FacilitySelector from '../../components/ui/FacilitySelector';
import UserRoleIndicator from '../../components/ui/UserRoleIndicator';
import QuickActionButton from '../../components/ui/QuickActionButton';
import Icon from '../../components/AppIcon';

import SystemStatsCards from './components/SystemStatsCards';
import UserManagementTable from './components/UserManagementTable';
import RoleConfigurationPanel from './components/RoleConfigurationPanel';
import SecuritySettingsPanel from './components/SecuritySettingsPanel';
import IntegrationManagementPanel from './components/IntegrationManagementPanel';
import AuditLogViewer from './components/AuditLogViewer';

const SystemAdministrationAndUserManagement = () => {
  const { isCollapsed } = useSidebar();
  const [activeTab, setActiveTab] = useState('users');

  const systemStats = [
  {
    id: 1,
    icon: 'Users',
    label: 'Total Users',
    value: '247',
    subtitle: '32 active sessions',
    color: 'var(--color-primary)',
    trend: { direction: 'up', value: '+12%' }
  },
  {
    id: 2,
    icon: 'Shield',
    label: 'Active Roles',
    value: '8',
    subtitle: '156 permissions configured',
    color: 'var(--color-accent)',
    trend: null
  },
  {
    id: 3,
    icon: 'AlertTriangle',
    label: 'Security Alerts',
    value: '3',
    subtitle: '2 require immediate attention',
    color: 'var(--color-warning)',
    trend: { direction: 'down', value: '-25%' }
  },
  {
    id: 4,
    icon: 'Activity',
    label: 'System Health',
    value: '98.7%',
    subtitle: 'All integrations operational',
    color: 'var(--color-success)',
    trend: { direction: 'up', value: '+2.3%' }
  }];


  const mockUsers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@facilitypro.com',
    employeeId: 'EMP-001',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_15b51d2e4-1763293833337.png",
    avatarAlt: 'Professional headshot of woman with blonde hair in navy blazer smiling at camera',
    role: 'admin',
    roleLabel: 'Administrator',
    department: 'IT Operations',
    permissionLevel: 'Full Access',
    lastLogin: '2025-11-20 08:45 AM',
    status: 'active'
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.chen@facilitypro.com',
    employeeId: 'EMP-002',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1665ca73c-1763296377705.png",
    avatarAlt: 'Professional headshot of Asian man with black hair in gray suit with confident expression',
    role: 'manager',
    roleLabel: 'Facility Manager',
    department: 'Operations',
    permissionLevel: 'Department Admin',
    lastLogin: '2025-11-20 09:12 AM',
    status: 'active'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@facilitypro.com',
    employeeId: 'EMP-003',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1975607e9-1763295500639.png",
    avatarAlt: 'Professional headshot of Hispanic woman with dark hair in white blouse with warm smile',
    role: 'supervisor',
    roleLabel: 'Operations Supervisor',
    department: 'Maintenance',
    permissionLevel: 'Team Lead',
    lastLogin: '2025-11-20 07:30 AM',
    status: 'active'
  },
  {
    id: 4,
    name: 'David Thompson',
    email: 'david.thompson@facilitypro.com',
    employeeId: 'EMP-004',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1219eacec-1763294869102.png",
    avatarAlt: 'Professional headshot of man with brown hair in blue shirt with friendly demeanor',
    role: 'technician',
    roleLabel: 'Maintenance Technician',
    department: 'Maintenance',
    permissionLevel: 'Standard User',
    lastLogin: '2025-11-19 04:15 PM',
    status: 'active'
  },
  {
    id: 5,
    name: 'Jessica Martinez',
    email: 'jessica.martinez@facilitypro.com',
    employeeId: 'EMP-005',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f6971df1-1763296070381.png",
    avatarAlt: 'Professional headshot of woman with curly brown hair in red blazer with professional appearance',
    role: 'staff',
    roleLabel: 'Administrative Staff',
    department: 'Administration',
    permissionLevel: 'Limited Access',
    lastLogin: '2025-11-20 08:00 AM',
    status: 'active'
  },
  {
    id: 6,
    name: 'Robert Wilson',
    email: 'robert.wilson@facilitypro.com',
    employeeId: 'EMP-006',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_112265a85-1763292077934.png",
    avatarAlt: 'Professional headshot of man with gray hair in dark suit with executive presence',
    role: 'manager',
    roleLabel: 'Facility Manager',
    department: 'Operations',
    permissionLevel: 'Department Admin',
    lastLogin: '2025-11-18 03:45 PM',
    status: 'inactive'
  },
  {
    id: 7,
    name: 'Amanda Lee',
    email: 'amanda.lee@facilitypro.com',
    employeeId: 'EMP-007',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b1b32f79-1763293656871.png",
    avatarAlt: 'Professional headshot of Asian woman with long black hair in teal blouse with confident smile',
    role: 'technician',
    roleLabel: 'Maintenance Technician',
    department: 'Maintenance',
    permissionLevel: 'Standard User',
    lastLogin: '2025-11-20 06:30 AM',
    status: 'active'
  },
  {
    id: 8,
    name: 'James Anderson',
    email: 'james.anderson@facilitypro.com',
    employeeId: 'EMP-008',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f7128937-1763299826636.png",
    avatarAlt: 'Professional headshot of man with blonde hair in light blue shirt with approachable expression',
    role: 'supervisor',
    roleLabel: 'Operations Supervisor',
    department: 'Operations',
    permissionLevel: 'Team Lead',
    lastLogin: '2025-11-20 09:00 AM',
    status: 'active'
  },
  {
    id: 9,
    name: 'Maria Garcia',
    email: 'maria.garcia@facilitypro.com',
    employeeId: 'EMP-009',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_127e35b32-1763295517666.png",
    avatarAlt: 'Professional headshot of Hispanic woman with dark hair in purple top with warm demeanor',
    role: 'staff',
    roleLabel: 'Administrative Staff',
    department: 'Administration',
    permissionLevel: 'Limited Access',
    lastLogin: '2025-11-15 02:20 PM',
    status: 'suspended'
  },
  {
    id: 10,
    name: 'Christopher Brown',
    email: 'christopher.brown@facilitypro.com',
    employeeId: 'EMP-010',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1a77e6824-1763296279560.png",
    avatarAlt: 'Professional headshot of man with dark hair in black shirt with serious professional look',
    role: 'technician',
    roleLabel: 'Maintenance Technician',
    department: 'Maintenance',
    permissionLevel: 'Standard User',
    lastLogin: '2025-11-20 07:45 AM',
    status: 'active'
  },
  {
    id: 11,
    name: 'Jennifer Taylor',
    email: 'jennifer.taylor@facilitypro.com',
    employeeId: 'EMP-011',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10e3d1880-1763301823543.png",
    avatarAlt: 'Professional headshot of woman with red hair in green blouse with friendly smile',
    role: 'manager',
    roleLabel: 'Facility Manager',
    department: 'Operations',
    permissionLevel: 'Department Admin',
    lastLogin: '2025-11-20 08:30 AM',
    status: 'active'
  },
  {
    id: 12,
    name: 'Daniel Kim',
    email: 'daniel.kim@facilitypro.com',
    employeeId: 'EMP-012',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f111493f-1763295642622.png",
    avatarAlt: 'Professional headshot of Asian man with short black hair in white shirt with professional demeanor',
    role: 'technician',
    roleLabel: 'Maintenance Technician',
    department: 'Maintenance',
    permissionLevel: 'Standard User',
    lastLogin: '2025-11-20 06:00 AM',
    status: 'active'
  },
  {
    id: 13,
    name: 'Lisa Patel',
    email: 'lisa.patel@facilitypro.com',
    employeeId: 'EMP-013',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e14322e7-1763296357021.png",
    avatarAlt: 'Professional headshot of Indian woman with long dark hair in blue blazer with confident expression',
    role: 'supervisor',
    roleLabel: 'Operations Supervisor',
    department: 'Operations',
    permissionLevel: 'Team Lead',
    lastLogin: '2025-11-20 08:15 AM',
    status: 'active'
  },
  {
    id: 14,
    name: 'Kevin White',
    email: 'kevin.white@facilitypro.com',
    employeeId: 'EMP-014',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_11ad87da0-1763294621347.png",
    avatarAlt: 'Professional headshot of man with brown hair in gray polo shirt with casual professional look',
    role: 'staff',
    roleLabel: 'Administrative Staff',
    department: 'Administration',
    permissionLevel: 'Limited Access',
    lastLogin: '2025-11-19 05:30 PM',
    status: 'active'
  },
  {
    id: 15,
    name: 'Rachel Green',
    email: 'rachel.green@facilitypro.com',
    employeeId: 'EMP-015',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1985c262f-1763294244026.png",
    avatarAlt: 'Professional headshot of woman with blonde hair in pink blouse with bright smile',
    role: 'technician',
    roleLabel: 'Maintenance Technician',
    department: 'Maintenance',
    permissionLevel: 'Standard User',
    lastLogin: '2025-11-20 07:00 AM',
    status: 'active'
  },
  {
    id: 16,
    name: 'Thomas Harris',
    email: 'thomas.harris@facilitypro.com',
    employeeId: 'EMP-016',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17eb2ca68-1763295028413.png",
    avatarAlt: 'Professional headshot of man with dark hair in navy suit with executive appearance',
    role: 'admin',
    roleLabel: 'Administrator',
    department: 'IT Operations',
    permissionLevel: 'Full Access',
    lastLogin: '2025-11-20 09:30 AM',
    status: 'active'
  },
  {
    id: 17,
    name: 'Nicole Davis',
    email: 'nicole.davis@facilitypro.com',
    employeeId: 'EMP-017',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1954af0d8-1763297441684.png",
    avatarAlt: 'Professional headshot of woman with brown hair in yellow top with cheerful expression',
    role: 'manager',
    roleLabel: 'Facility Manager',
    department: 'Operations',
    permissionLevel: 'Department Admin',
    lastLogin: '2025-11-20 08:45 AM',
    status: 'active'
  },
  {
    id: 18,
    name: 'Brian Miller',
    email: 'brian.miller@facilitypro.com',
    employeeId: 'EMP-018',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1210fa420-1763291826720.png",
    avatarAlt: 'Professional headshot of man with light brown hair in green shirt with friendly demeanor',
    role: 'technician',
    roleLabel: 'Maintenance Technician',
    department: 'Maintenance',
    permissionLevel: 'Standard User',
    lastLogin: '2025-11-17 03:00 PM',
    status: 'inactive'
  },
  {
    id: 19,
    name: 'Stephanie Moore',
    email: 'stephanie.moore@facilitypro.com',
    employeeId: 'EMP-019',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f29bba35-1763298667903.png",
    avatarAlt: 'Professional headshot of woman with dark hair in orange blouse with professional smile',
    role: 'supervisor',
    roleLabel: 'Operations Supervisor',
    department: 'Operations',
    permissionLevel: 'Team Lead',
    lastLogin: '2025-11-20 07:15 AM',
    status: 'active'
  },
  {
    id: 20,
    name: 'Andrew Jackson',
    email: 'andrew.jackson@facilitypro.com',
    employeeId: 'EMP-020',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_15b9af70c-1763295447546.png",
    avatarAlt: 'Professional headshot of man with black hair in burgundy shirt with confident look',
    role: 'staff',
    roleLabel: 'Administrative Staff',
    department: 'Administration',
    permissionLevel: 'Limited Access',
    lastLogin: '2025-11-20 08:00 AM',
    status: 'active'
  },
  {
    id: 21,
    name: 'Michelle Lewis',
    email: 'michelle.lewis@facilitypro.com',
    employeeId: 'EMP-021',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_16fb6600f-1763295222357.png",
    avatarAlt: 'Professional headshot of woman with auburn hair in teal blazer with warm professional appearance',
    role: 'technician',
    roleLabel: 'Maintenance Technician',
    department: 'Maintenance',
    permissionLevel: 'Standard User',
    lastLogin: '2025-11-20 06:45 AM',
    status: 'active'
  },
  {
    id: 22,
    name: 'Steven Clark',
    email: 'steven.clark@facilitypro.com',
    employeeId: 'EMP-022',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14513944f-1763292856103.png",
    avatarAlt: 'Professional headshot of man with gray hair in charcoal suit with distinguished appearance',
    role: 'manager',
    roleLabel: 'Facility Manager',
    department: 'Operations',
    permissionLevel: 'Department Admin',
    lastLogin: '2025-11-20 09:15 AM',
    status: 'active'
  }];


  const mockRoles = [
  {
    id: 1,
    name: 'Administrator',
    description: 'Full system access with all administrative privileges',
    icon: 'ShieldCheck',
    userCount: 8,
    permissions: ['user_view', 'user_create', 'user_edit', 'user_delete', 'user_roles', 'wo_view', 'wo_create', 'wo_assign', 'wo_approve', 'wo_close', 'asset_view', 'asset_create', 'asset_edit', 'asset_delete', 'inventory_manage', 'report_view', 'report_create', 'report_export', 'analytics_view', 'system_config', 'security_manage', 'integration_manage', 'audit_view']
  },
  {
    id: 2,
    name: 'Facility Manager',
    description: 'Manage facility operations and department resources',
    icon: 'Building2',
    userCount: 15,
    permissions: ['user_view', 'wo_view', 'wo_create', 'wo_assign', 'wo_approve', 'wo_close', 'asset_view', 'asset_create', 'asset_edit', 'inventory_manage', 'report_view', 'report_create', 'report_export', 'analytics_view']
  },
  {
    id: 3,
    name: 'Operations Supervisor',
    description: 'Supervise daily operations and team assignments',
    icon: 'UserCheck',
    userCount: 12,
    permissions: ['user_view', 'wo_view', 'wo_create', 'wo_assign', 'wo_close', 'asset_view', 'asset_edit', 'inventory_manage', 'report_view', 'analytics_view']
  },
  {
    id: 4,
    name: 'Maintenance Technician',
    description: 'Execute maintenance tasks and update work orders',
    icon: 'Wrench',
    userCount: 45,
    permissions: ['wo_view', 'wo_close', 'asset_view', 'report_view']
  },
  {
    id: 5,
    name: 'Administrative Staff',
    description: 'Handle administrative tasks and documentation',
    icon: 'FileText',
    userCount: 18,
    permissions: ['user_view', 'wo_view', 'wo_create', 'asset_view', 'report_view']
  }];


  const mockSecuritySettings = {
    passwordPolicy: {
      minLength: '12',
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      expiryDays: '90',
      historyCount: '5'
    },
    sessionManagement: {
      timeout: '30',
      allowConcurrent: true,
      maxConcurrent: '3'
    },
    mfaSettings: {
      required: false,
      requiredForAdmins: true,
      allowSMS: true,
      allowAuthenticator: true,
      allowEmail: true,
      allowBackupCodes: true
    },
    lockoutPolicy: {
      enabled: true,
      maxAttempts: '5',
      lockoutDuration: '30'
    }
  };

  const mockIntegrations = [
  {
    id: 1,
    name: 'Active Directory / LDAP',
    description: 'Enterprise directory service for user authentication and management',
    icon: 'Users',
    status: 'connected',
    statusLabel: 'Connected',
    lastSync: '2025-11-20 09:30 AM',
    syncFrequency: 'Every 15 minutes',
    recordsSync: '247',
    config: [
    { label: 'Server', value: 'ldap.facilitypro.com' },
    { label: 'Port', value: '636 (SSL)' },
    { label: 'Base DN', value: 'dc=facilitypro,dc=com' },
    { label: 'Sync Method', value: 'Incremental' }],

    recentActivity: [
    { status: 'connected', message: 'Successfully synced 247 user accounts', timestamp: '2 minutes ago' },
    { status: 'connected', message: 'Updated 12 user profiles', timestamp: '17 minutes ago' },
    { status: 'connected', message: 'Added 3 new users from directory', timestamp: '1 hour ago' }],

    errorLog: []
  },
  {
    id: 2,
    name: 'Single Sign-On (SSO)',
    description: 'SAML 2.0 based authentication for seamless user access',
    icon: 'Key',
    status: 'connected',
    statusLabel: 'Connected',
    lastSync: '2025-11-20 09:25 AM',
    syncFrequency: 'Real-time',
    config: [
    { label: 'Identity Provider', value: 'Okta' },
    { label: 'Protocol', value: 'SAML 2.0' },
    { label: 'Entity ID', value: 'facilitypro-prod' },
    { label: 'ACS URL', value: 'https://app.facilitypro.com/sso/acs' }],

    recentActivity: [
    { status: 'connected', message: '156 successful SSO authentications', timestamp: '5 minutes ago' },
    { status: 'connected', message: 'Token refresh completed', timestamp: '30 minutes ago' },
    { status: 'connected', message: 'Certificate validation successful', timestamp: '2 hours ago' }],

    errorLog: []
  },
  {
    id: 3,
    name: 'ERP System (SAP)',
    description: 'Enterprise resource planning integration for asset and inventory data',
    icon: 'Database',
    status: 'warning',
    statusLabel: 'Delayed Sync',
    lastSync: '2025-11-20 07:15 AM',
    syncFrequency: 'Every 30 minutes',
    recordsSync: '1,847',
    config: [
    { label: 'System', value: 'SAP S/4HANA' },
    { label: 'Environment', value: 'Production' },
    { label: 'API Version', value: 'v2.0' },
    { label: 'Sync Type', value: 'Bidirectional' }],

    recentActivity: [
    { status: 'warning', message: 'Sync delayed due to high system load', timestamp: '2 hours ago' },
    { status: 'connected', message: 'Successfully synced 1,847 asset records', timestamp: '2 hours ago' },
    { status: 'connected', message: 'Updated inventory levels for 342 items', timestamp: '3 hours ago' }],

    errorLog: [
    { timestamp: '2025-11-20 07:15 AM', message: 'Connection timeout - retrying in 15 minutes' }]

  },
  {
    id: 4,
    name: 'Email Service (SMTP)',
    description: 'Email notification system for alerts and communications',
    icon: 'Mail',
    status: 'connected',
    statusLabel: 'Connected',
    lastSync: '2025-11-20 09:35 AM',
    syncFrequency: 'Real-time',
    config: [
    { label: 'Provider', value: 'SendGrid' },
    { label: 'Server', value: 'smtp.sendgrid.net' },
    { label: 'Port', value: '587 (TLS)' },
    { label: 'Daily Limit', value: '10,000 emails' }],

    recentActivity: [
    { status: 'connected', message: 'Sent 47 notification emails', timestamp: 'Just now' },
    { status: 'connected', message: 'Delivered 156 work order updates', timestamp: '15 minutes ago' },
    { status: 'connected', message: 'Processed 23 alert notifications', timestamp: '1 hour ago' }],

    errorLog: []
  },
  {
    id: 5,
    name: 'IoT Sensor Platform',
    description: 'Real-time data ingestion from facility sensors and monitoring devices',
    icon: 'Wifi',
    status: 'error',
    statusLabel: 'Connection Error',
    lastSync: '2025-11-19 11:45 PM',
    syncFrequency: 'Every 5 minutes',
    recordsSync: '0',
    config: [
    { label: 'Platform', value: 'AWS IoT Core' },
    { label: 'Protocol', value: 'MQTT' },
    { label: 'Devices', value: '342 sensors' },
    { label: 'Region', value: 'us-east-1' }],

    recentActivity: [
    { status: 'error', message: 'Connection lost to IoT platform', timestamp: '10 hours ago' },
    { status: 'error', message: 'Failed to authenticate with IoT Core', timestamp: '10 hours ago' },
    { status: 'connected', message: 'Last successful data ingestion', timestamp: '10 hours ago' }],

    errorLog: [
    { timestamp: '2025-11-20 09:30 AM', message: 'Authentication failed - invalid credentials' },
    { timestamp: '2025-11-20 06:15 AM', message: 'Connection timeout after 30 seconds' },
    { timestamp: '2025-11-19 11:45 PM', message: 'SSL certificate validation error' }]

  }];


  const mockAuditLogs = [
  {
    id: 1,
    timestamp: '2025-11-20 09:35 AM',
    action: 'User Created',
    actionType: 'user_created',
    user: 'Sarah Johnson',
    userId: 'EMP-001',
    userRole: 'admin',
    details: 'Created new user account for Andrew Jackson (EMP-020)',
    ipAddress: '192.168.1.45',
    severity: 'low'
  },
  {
    id: 2,
    timestamp: '2025-11-20 09:30 AM',
    action: 'Role Changed',
    actionType: 'role_changed',
    user: 'Sarah Johnson',
    userId: 'EMP-001',
    userRole: 'admin',
    details: 'Changed role from Technician to Supervisor for Emily Rodriguez',
    ipAddress: '192.168.1.45',
    severity: 'medium'
  },
  {
    id: 3,
    timestamp: '2025-11-20 09:25 AM',
    action: 'Login',
    actionType: 'login',
    user: 'Michael Chen',
    userId: 'EMP-002',
    userRole: 'manager',
    details: 'Successful login via SSO',
    ipAddress: '192.168.1.78',
    severity: 'low'
  },
  {
    id: 4,
    timestamp: '2025-11-20 09:20 AM',
    action: 'Permission Modified',
    actionType: 'permission_modified',
    user: 'Sarah Johnson',
    userId: 'EMP-001',
    userRole: 'admin',
    details: 'Updated permissions for Facility Manager role',
    ipAddress: '192.168.1.45',
    severity: 'high'
  },
  {
    id: 5,
    timestamp: '2025-11-20 09:15 AM',
    action: 'Settings Updated',
    actionType: 'settings_updated',
    user: 'Thomas Harris',
    userId: 'EMP-016',
    userRole: 'admin',
    details: 'Modified password policy requirements',
    ipAddress: '192.168.1.92',
    severity: 'high'
  },
  {
    id: 6,
    timestamp: '2025-11-20 09:10 AM',
    action: 'User Updated',
    actionType: 'user_updated',
    user: 'Jennifer Taylor',
    userId: 'EMP-011',
    userRole: 'manager',
    details: 'Updated contact information for David Thompson',
    ipAddress: '192.168.1.56',
    severity: 'low'
  },
  {
    id: 7,
    timestamp: '2025-11-20 09:05 AM',
    action: 'Login',
    actionType: 'login',
    user: 'Emily Rodriguez',
    userId: 'EMP-003',
    userRole: 'supervisor',
    details: 'Successful login from mobile device',
    ipAddress: '10.0.2.15',
    severity: 'low'
  },
  {
    id: 8,
    timestamp: '2025-11-20 09:00 AM',
    action: 'Password Changed',
    actionType: 'password_changed',
    user: 'David Thompson',
    userId: 'EMP-004',
    userRole: 'technician',
    details: 'User initiated password change',
    ipAddress: '192.168.1.123',
    severity: 'medium'
  },
  {
    id: 9,
    timestamp: '2025-11-20 08:55 AM',
    action: 'User Deleted',
    actionType: 'user_deleted',
    user: 'Sarah Johnson',
    userId: 'EMP-001',
    userRole: 'admin',
    details: 'Removed inactive contractor account (CONT-045)',
    ipAddress: '192.168.1.45',
    severity: 'high'
  },
  {
    id: 10,
    timestamp: '2025-11-20 08:50 AM',
    action: 'Login',
    actionType: 'login',
    user: 'Jessica Martinez',
    userId: 'EMP-005',
    userRole: 'staff',
    details: 'Successful login',
    ipAddress: '192.168.1.67',
    severity: 'low'
  },
  {
    id: 11,
    timestamp: '2025-11-20 08:45 AM',
    action: 'Settings Updated',
    actionType: 'settings_updated',
    user: 'Sarah Johnson',
    userId: 'EMP-001',
    userRole: 'admin',
    details: 'Updated session timeout configuration',
    ipAddress: '192.168.1.45',
    severity: 'medium'
  },
  {
    id: 12,
    timestamp: '2025-11-20 08:40 AM',
    action: 'Login',
    actionType: 'login',
    user: 'Nicole Davis',
    userId: 'EMP-017',
    userRole: 'manager',
    details: 'Successful login via SSO',
    ipAddress: '192.168.1.89',
    severity: 'low'
  },
  {
    id: 13,
    timestamp: '2025-11-20 08:35 AM',
    action: 'Role Changed',
    actionType: 'role_changed',
    user: 'Michael Chen',
    userId: 'EMP-002',
    userRole: 'manager',
    details: 'Promoted Amanda Lee to Senior Technician role',
    ipAddress: '192.168.1.78',
    severity: 'medium'
  },
  {
    id: 14,
    timestamp: '2025-11-20 08:30 AM',
    action: 'User Created',
    actionType: 'user_created',
    user: 'Thomas Harris',
    userId: 'EMP-016',
    userRole: 'admin',
    details: 'Created new contractor account (CONT-046)',
    ipAddress: '192.168.1.92',
    severity: 'low'
  },
  {
    id: 15,
    timestamp: '2025-11-20 08:25 AM',
    action: 'Permission Modified',
    actionType: 'permission_modified',
    user: 'Sarah Johnson',
    userId: 'EMP-001',
    userRole: 'admin',
    details: 'Granted report export permission to Operations Supervisor role',
    ipAddress: '192.168.1.45',
    severity: 'medium'
  }];


  const tabs = [
  { id: 'users', label: 'User Management', icon: 'Users' },
  { id: 'roles', label: 'Role Configuration', icon: 'Shield' },
  { id: 'security', label: 'Security Settings', icon: 'Lock' },
  { id: 'integrations', label: 'Integrations', icon: 'Plug' },
  { id: 'audit', label: 'Audit Logs', icon: 'FileText' }];


  const handleEditUser = (user) => {
    console.log('Edit user:', user);
  };

  const handleDeleteUser = (userId) => {
    console.log('Delete user:', userId);
  };

  const handleBulkAction = (action, userIds) => {
    console.log('Bulk action:', action, userIds);
  };

  const handleUpdateRole = (role) => {
    console.log('Update role:', role);
  };

  const handleCreateRole = () => {
    console.log('Create new role');
  };

  const handleUpdateSettings = (settings) => {
    console.log('Update settings:', settings);
  };

  const handleTestConnection = (integrationId) => {
    console.log('Test connection:', integrationId);
  };

  const handleConfigureIntegration = (integrationId) => {
    console.log('Configure integration:', integrationId);
  };

  const handleExportLogs = () => {
    console.log('Export audit logs');
  };

  return (
    <SidebarProvider>
      <div className="dark min-h-screen bg-background">
        <MobileMenuButton />
        <Sidebar />
        <div className={`main-content ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
          <header className="sticky top-0 z-30 bg-card border-b border-border mb-6 -mx-6 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-1">System Administration</h1>
                <p className="text-sm text-muted-foreground">Manage users, roles, security, and system integrations</p>
              </div>
              <div className="flex items-center gap-3">
                <AlertCounter />
                <FacilitySelector />
                <UserRoleIndicator />
              </div>
            </div>
          </header>

          <SystemStatsCards stats={systemStats} />

          <div className="mt-6 bg-card rounded-lg border border-border">
            <div className="border-b border-border overflow-x-auto">
              <div className="flex">
                {tabs?.map((tab) =>
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab?.id ?
                  'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`
                  }>

                    <Icon
                    name={tab?.icon}
                    size={18}
                    color={activeTab === tab?.id ? 'var(--color-primary)' : 'var(--color-muted-foreground)'} />

                    {tab?.label}
                  </button>
                )}
              </div>
            </div>

            <div className="p-6">
              {activeTab === 'users' &&
              <UserManagementTable
                users={mockUsers}
                onEditUser={handleEditUser}
                onDeleteUser={handleDeleteUser}
                onBulkAction={handleBulkAction} />

              }

              {activeTab === 'roles' &&
              <RoleConfigurationPanel
                roles={mockRoles}
                onUpdateRole={handleUpdateRole}
                onCreateRole={handleCreateRole} />

              }

              {activeTab === 'security' &&
              <SecuritySettingsPanel
                settings={mockSecuritySettings}
                onUpdateSettings={handleUpdateSettings} />

              }

              {activeTab === 'integrations' &&
              <IntegrationManagementPanel
                integrations={mockIntegrations}
                onTestConnection={handleTestConnection}
                onConfigureIntegration={handleConfigureIntegration} />

              }

              {activeTab === 'audit' &&
              <AuditLogViewer
                logs={mockAuditLogs}
                onExportLogs={handleExportLogs} />

              }
            </div>
          </div>
        </div>
      </div>

      <QuickActionButton />
    </SidebarProvider>
  );
};

export default SystemAdministrationAndUserManagement;