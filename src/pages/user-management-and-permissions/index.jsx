import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import QuickActionButton from '../../components/ui/QuickActionButton';
import UserTable from './components/UserTable';
import PermissionPanel from './components/PermissionPanel';
import AuditTrail from './components/AuditTrail';
import RoleManagement from './components/RoleManagement';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const UserManagementAndPermissions = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // Mock data for users
  const [users] = useState([
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@facilityPro.com",
    role: "Facility Manager",
    roleId: "fm",
    department: "Operations",
    status: "Active",
    lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000),
    sessions: [
    {
      id: "s1",
      device: "Chrome on Windows",
      location: "New York, NY",
      ip: "192.168.1.100",
      startTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: "active"
    }]

  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@facilityPro.com",
    role: "Maintenance Supervisor",
    roleId: "ms",
    department: "Maintenance",
    status: "Active",
    lastLogin: new Date(Date.now() - 5 * 60 * 60 * 1000),
    sessions: [
    {
      id: "s2",
      device: "Safari on iPhone",
      location: "Boston, MA",
      ip: "192.168.1.101",
      startTime: new Date(Date.now() - 5 * 60 * 60 * 1000),
      status: "active"
    }]

  },
  {
    id: 3,
    name: "Mike Rodriguez",
    email: "mike.rodriguez@facilityPro.com",
    role: "Technician",
    roleId: "tech",
    department: "Field Operations",
    status: "Active",
    lastLogin: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    sessions: []
  },
  {
    id: 4,
    name: "Emily Chen",
    email: "emily.chen@facilityPro.com",
    role: "Inventory Manager",
    roleId: "im",
    department: "Supply Chain",
    status: "Active",
    lastLogin: new Date(Date.now() - 3 * 60 * 60 * 1000),
    sessions: [
    {
      id: "s4",
      device: "Chrome on MacOS",
      location: "San Francisco, CA",
      ip: "192.168.1.103",
      startTime: new Date(Date.now() - 3 * 60 * 60 * 1000),
      status: "active"
    }]

  },
  {
    id: 5,
    name: "David Wilson",
    email: "david.wilson@facilityPro.com",
    role: "Technician",
    roleId: "tech",
    department: "Field Operations",
    status: "Suspended",
    lastLogin: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    sessions: []
  },
  {
    id: 6,
    name: "Lisa Anderson",
    email: "lisa.anderson@facilityPro.com",
    role: "Facility Manager",
    roleId: "fm",
    department: "Operations",
    status: "Pending",
    lastLogin: null,
    sessions: []
  }]
  );

  // Mock data for roles
  const [roles] = useState([
  {
    id: "fm",
    name: "Facility Manager",
    description: "Full access to all facility management functions",
    userCount: 2,
    lastModified: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    permissions: {
      'work_orders.view': true,
      'work_orders.create': true,
      'work_orders.edit': true,
      'work_orders.delete': true,
      'work_orders.assign': true,
      'assets.view': true,
      'assets.create': true,
      'assets.edit': true,
      'assets.delete': true,
      'reports.view': true,
      'reports.create': true,
      'reports.export': true,
      'admin.users': true,
      'admin.roles': true,
      'admin.settings': true
    }
  },
  {
    id: "ms",
    name: "Maintenance Supervisor",
    description: "Supervise maintenance operations and technician assignments",
    userCount: 1,
    lastModified: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    permissions: {
      'work_orders.view': true,
      'work_orders.create': true,
      'work_orders.edit': true,
      'work_orders.assign': true,
      'assets.view': true,
      'assets.edit': true,
      'reports.view': true,
      'reports.create': true
    }
  },
  {
    id: "tech",
    name: "Technician",
    description: "Execute maintenance tasks and update work orders",
    userCount: 2,
    lastModified: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    permissions: {
      'work_orders.view': true,
      'work_orders.edit': true,
      'assets.view': true,
      'reports.view': true
    }
  },
  {
    id: "im",
    name: "Inventory Manager",
    description: "Manage parts inventory and procurement",
    userCount: 1,
    lastModified: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    permissions: {
      'work_orders.view': true,
      'assets.view': true,
      'reports.view': true,
      'reports.create': true
    }
  }]
  );

  // Mock data for permissions
  const [permissions, setPermissions] = useState({
    'work-orders.view': true,
    'work-orders.create': false,
    'work-orders.edit': true,
    'assets.view': true,
    'assets.create': false,
    'reports.view': true,
    'reports.export': false
  });

  // Mock data for audit logs
  const [auditLogs] = useState([
  {
    id: 1,
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    type: 'permission',
    action: 'Permission Modified',
    user: 'John Smith',
    targetUser: 'Mike Rodriguez',
    details: 'Granted work order creation permission',
    severity: 'medium',
    ipAddress: '192.168.1.100',
    sessionId: 'sess_abc123',
    riskScore: 3,
    changes: {
      'work_orders.create': { from: false, to: true }
    }
  },
  {
    id: 2,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    type: 'user',
    action: 'User Account Created',
    user: 'Sarah Johnson',
    targetUser: 'Lisa Anderson',
    details: 'Created new user account with Facility Manager role',
    severity: 'high',
    ipAddress: '192.168.1.101',
    sessionId: 'sess_def456',
    riskScore: 6,
    changes: {
      status: { from: null, to: 'pending' },
      role: { from: null, to: 'Facility Manager' }
    }
  },
  {
    id: 3,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    type: 'login',
    action: 'Successful Login',
    user: 'Mike Rodriguez',
    details: 'User logged in successfully from mobile device',
    severity: 'low',
    ipAddress: '192.168.1.102',
    sessionId: 'sess_ghi789',
    riskScore: 1
  },
  {
    id: 4,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    type: 'role',
    action: 'Role Permissions Updated',
    user: 'John Smith',
    details: 'Modified Technician role permissions',
    severity: 'medium',
    ipAddress: '192.168.1.100',
    sessionId: 'sess_jkl012',
    riskScore: 4,
    changes: {
      'assets.edit': { from: false, to: true }
    }
  },
  {
    id: 5,
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    type: 'system',
    action: 'System Configuration Changed',
    user: 'John Smith',
    details: 'Updated password policy requirements',
    severity: 'high',
    ipAddress: '192.168.1.100',
    sessionId: 'sess_mno345',
    riskScore: 7,
    changes: {
      'password_min_length': { from: 8, to: 12 },
      'require_special_chars': { from: false, to: true }
    }
  }]
  );

  const handleUserSelect = (userId, checked) => {
    setSelectedUsers((prev) =>
    checked ?
    [...prev, userId] :
    prev?.filter((id) => id !== userId)
    );
  };

  const handleSelectAll = (checked) => {
    setSelectedUsers(checked ? users?.map((user) => user?.id) : []);
  };

  const handleUserEdit = (user) => {
    setSelectedUser(user);
    setActiveTab('permissions');
  };

  const handleUserDelete = (user) => {
    console.log('Delete user:', user);
    // Handle user deletion
  };

  const handleBulkAction = (action) => {
    console.log('Bulk action:', action, 'for users:', selectedUsers);
    // Handle bulk actions
  };

  const handlePermissionChange = (moduleId, permissionId, checked) => {
    const key = `${moduleId}.${permissionId}`;
    setPermissions((prev) => ({
      ...prev,
      [key]: checked
    }));
  };

  const handleRoleChange = (userId, roleId) => {
    console.log('Role change for user:', userId, 'to role:', roleId);
    // Handle role change
  };

  const handleSavePermissions = (userId) => {
    console.log('Save permissions for user:', userId, permissions);
    // Handle save permissions
  };

  const handleExportAudit = () => {
    console.log('Export audit log');
    // Handle audit export
  };

  const handleCreateRole = (roleData) => {
    console.log('Create role:', roleData);
    // Handle role creation
  };

  const handleEditRole = (roleId, roleData) => {
    console.log('Edit role:', roleId, roleData);
    // Handle role editing
  };

  const handleDeleteRole = (roleId) => {
    console.log('Delete role:', roleId);
    // Handle role deletion
  };

  const handleDuplicateRole = (role) => {
    console.log('Duplicate role:', role);
    // Handle role duplication
  };

  const tabs = [
  { id: 'users', label: 'Users', icon: 'Users', count: users?.length },
  { id: 'permissions', label: 'Permissions', icon: 'Key', count: null },
  { id: 'roles', label: 'Roles', icon: 'Shield', count: roles?.length },
  { id: 'audit', label: 'Audit Trail', icon: 'FileText', count: auditLogs?.length }];


  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-primary rounded-lg items-center justify-center hidden">
                <Icon name="UserCog" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">User Management & Permissions</h1>
                <p className="text-muted-foreground">
                  Manage user accounts, roles, and access permissions across the facility management system
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Users" size={16} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{users?.length}</div>
                    <div className="text-sm text-muted-foreground">Total Users</div>
                  </div>
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                    <Icon name="UserCheck" size={16} className="text-success" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      {users?.filter((u) => u?.status === 'Active')?.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Active Users</div>
                  </div>
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name="Shield" size={16} className="text-accent" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{roles?.length}</div>
                    <div className="text-sm text-muted-foreground">User Roles</div>
                  </div>
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
                    <Icon name="Activity" size={16} className="text-warning" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      {users?.filter((u) => u?.sessions && u?.sessions?.length > 0)?.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Active Sessions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 bg-muted rounded-lg p-1 mb-6">
            {tabs?.map((tab) =>
            <Button
              key={tab?.id}
              variant={activeTab === tab?.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab(tab?.id)}
              className="flex-1">

                <Icon name={tab?.icon} size={16} className="mr-2" />
                {tab?.label}
                {tab?.count !== null &&
              <span className="ml-2 bg-background text-foreground text-xs px-2 py-0.5 rounded-full">
                    {tab?.count}
                  </span>
              }
              </Button>
            )}
          </div>

          {/* Content */}
          {activeTab === 'users' &&
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <UserTable
                users={users}
                selectedUsers={selectedUsers}
                onUserSelect={handleUserSelect}
                onSelectAll={handleSelectAll}
                onUserEdit={handleUserEdit}
                onUserDelete={handleUserDelete}
                onBulkAction={handleBulkAction} />

              </div>
              <div className="xl:col-span-1">
                <PermissionPanel
                selectedUser={selectedUser}
                roles={roles}
                permissions={permissions}
                onPermissionChange={handlePermissionChange}
                onRoleChange={handleRoleChange}
                onSavePermissions={handleSavePermissions} />

              </div>
            </div>
          }

          {activeTab === 'permissions' &&
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <UserTable
                users={users}
                selectedUsers={selectedUsers}
                onUserSelect={handleUserSelect}
                onSelectAll={handleSelectAll}
                onUserEdit={handleUserEdit}
                onUserDelete={handleUserDelete}
                onBulkAction={handleBulkAction} />

              </div>
              <div className="xl:col-span-1">
                <PermissionPanel
                selectedUser={selectedUser}
                roles={roles}
                permissions={permissions}
                onPermissionChange={handlePermissionChange}
                onRoleChange={handleRoleChange}
                onSavePermissions={handleSavePermissions} />

              </div>
            </div>
          }

          {activeTab === 'roles' &&
          <RoleManagement
            roles={roles}
            onCreateRole={handleCreateRole}
            onEditRole={handleEditRole}
            onDeleteRole={handleDeleteRole}
            onDuplicateRole={handleDuplicateRole} />

          }

          {activeTab === 'audit' &&
          <AuditTrail
            auditLogs={auditLogs}
            onExportAudit={handleExportAudit} />

          }
        </div>
      </main>
      <QuickActionButton />
    </div>);

};

export default UserManagementAndPermissions;