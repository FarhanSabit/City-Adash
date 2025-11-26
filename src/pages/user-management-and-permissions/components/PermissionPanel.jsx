import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const PermissionPanel = ({ selectedUser, roles, permissions, onPermissionChange, onRoleChange, onSavePermissions }) => {
  const [activeTab, setActiveTab] = useState('roles');
  const [expandedModules, setExpandedModules] = useState(['work-orders']);

  const modulePermissions = [
    {
      id: 'work-orders',
      name: 'Work Orders',
      icon: 'Kanban',
      permissions: [
        { id: 'view', name: 'View Work Orders', description: 'Can view all work orders' },
        { id: 'create', name: 'Create Work Orders', description: 'Can create new work orders' },
        { id: 'edit', name: 'Edit Work Orders', description: 'Can modify existing work orders' },
        { id: 'delete', name: 'Delete Work Orders', description: 'Can delete work orders' },
        { id: 'assign', name: 'Assign Technicians', description: 'Can assign work orders to technicians' },
        { id: 'approve', name: 'Approve Completion', description: 'Can approve work order completion' }
      ]
    },
    {
      id: 'assets',
      name: 'Asset Management',
      icon: 'Package',
      permissions: [
        { id: 'view', name: 'View Assets', description: 'Can view equipment and assets' },
        { id: 'create', name: 'Add Assets', description: 'Can add new equipment to inventory' },
        { id: 'edit', name: 'Edit Assets', description: 'Can modify asset information' },
        { id: 'delete', name: 'Remove Assets', description: 'Can remove assets from system' },
        { id: 'maintenance', name: 'Schedule Maintenance', description: 'Can schedule preventive maintenance' }
      ]
    },
    {
      id: 'inventory',
      name: 'Parts Inventory',
      icon: 'Archive',
      permissions: [
        { id: 'view', name: 'View Inventory', description: 'Can view parts inventory' },
        { id: 'order', name: 'Order Parts', description: 'Can place orders for parts' },
        { id: 'receive', name: 'Receive Parts', description: 'Can receive and check in parts' },
        { id: 'adjust', name: 'Adjust Inventory', description: 'Can adjust inventory levels' }
      ]
    },
    {
      id: 'reports',
      name: 'Reports & Analytics',
      icon: 'BarChart3',
      permissions: [
        { id: 'view', name: 'View Reports', description: 'Can view standard reports' },
        { id: 'create', name: 'Create Reports', description: 'Can create custom reports' },
        { id: 'export', name: 'Export Data', description: 'Can export report data' },
        { id: 'schedule', name: 'Schedule Reports', description: 'Can schedule automated reports' }
      ]
    },
    {
      id: 'administration',
      name: 'System Administration',
      icon: 'Settings',
      permissions: [
        { id: 'users', name: 'Manage Users', description: 'Can manage user accounts' },
        { id: 'roles', name: 'Manage Roles', description: 'Can create and modify roles' },
        { id: 'settings', name: 'System Settings', description: 'Can modify system configuration' },
        { id: 'audit', name: 'View Audit Logs', description: 'Can view system audit trails' }
      ]
    }
  ];

  const roleOptions = roles?.map(role => ({
    value: role?.id,
    label: role?.name,
    description: role?.description
  }));

  const toggleModule = (moduleId) => {
    setExpandedModules(prev =>
      prev?.includes(moduleId)
        ? prev?.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const hasPermission = (moduleId, permissionId) => {
    return permissions?.[`${moduleId}.${permissionId}`] || false;
  };

  const getPermissionCount = (moduleId) => {
    const modulePerms = modulePermissions?.find(m => m?.id === moduleId)?.permissions || [];
    const granted = modulePerms?.filter(p => hasPermission(moduleId, p?.id))?.length;
    return `${granted}/${modulePerms?.length}`;
  };

  if (!selectedUser) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-soft h-full">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <Icon name="UserCog" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No User Selected</h3>
            <p className="text-sm text-muted-foreground">
              Select a user from the table to manage their permissions
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <span className="text-lg font-medium text-primary-foreground">
              {selectedUser?.name?.split(' ')?.map(n => n?.[0])?.join('')}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">{selectedUser?.name}</h2>
            <p className="text-sm text-muted-foreground">{selectedUser?.email}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          <Button
            variant={activeTab === 'roles' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('roles')}
            className="flex-1"
          >
            <Icon name="Shield" size={16} className="mr-2" />
            Roles
          </Button>
          <Button
            variant={activeTab === 'permissions' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('permissions')}
            className="flex-1"
          >
            <Icon name="Key" size={16} className="mr-2" />
            Permissions
          </Button>
          <Button
            variant={activeTab === 'sessions' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('sessions')}
            className="flex-1"
          >
            <Icon name="Monitor" size={16} className="mr-2" />
            Sessions
          </Button>
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'roles' && (
          <div className="p-6">
            <div className="mb-6">
              <Select
                label="Primary Role"
                description="Select the user's primary role which determines base permissions"
                options={roleOptions}
                value={selectedUser?.roleId}
                onChange={(value) => onRoleChange(selectedUser?.id, value)}
                className="mb-4"
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-foreground">Role Permissions Summary</h3>
              {roles?.find(r => r?.id === selectedUser?.roleId)?.permissions?.length > 0 ? (
                roles?.find(r => r?.id === selectedUser?.roleId)?.permissions?.map((permission) => (
                  <div key={permission?.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <div className="font-medium text-foreground">{permission?.name}</div>
                      <div className="text-sm text-muted-foreground">{permission?.description}</div>
                    </div>
                    <Icon name="Check" size={16} className="text-success" />
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No role selected or no permissions available</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'permissions' && (
          <div className="p-6">
            <div className="mb-6">
              <h3 className="font-medium text-foreground mb-2">Module Permissions</h3>
              <p className="text-sm text-muted-foreground">
                Grant specific permissions beyond the user's role
              </p>
            </div>

            <div className="space-y-4">
              {modulePermissions?.map((module) => (
                <div key={module.id} className="border border-border rounded-lg">
                  <Button
                    variant="ghost"
                    onClick={() => toggleModule(module.id)}
                    className="w-full justify-between p-4 h-auto"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name={module.icon} size={20} />
                      <div className="text-left">
                        <div className="font-medium text-foreground">{module.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {getPermissionCount(module.id)} permissions granted
                        </div>
                      </div>
                    </div>
                    <Icon 
                      name={expandedModules?.includes(module.id) ? "ChevronDown" : "ChevronRight"} 
                      size={16} 
                    />
                  </Button>

                  {expandedModules?.includes(module.id) && (
                    <div className="border-t border-border p-4 space-y-3">
                      {module.permissions?.map((permission) => (
                        <div key={permission?.id} className="flex items-start space-x-3">
                          <Checkbox
                            checked={hasPermission(module.id, permission?.id)}
                            onChange={(e) => onPermissionChange(module.id, permission?.id, e?.target?.checked)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-foreground">{permission?.name}</div>
                            <div className="text-sm text-muted-foreground">{permission?.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'sessions' && (
          <div className="p-6">
            <div className="mb-6">
              <h3 className="font-medium text-foreground mb-2">Active Sessions</h3>
              <p className="text-sm text-muted-foreground">
                Monitor and manage user's active login sessions
              </p>
            </div>

            <div className="space-y-4">
              {selectedUser?.sessions?.length > 0 ? (
                selectedUser?.sessions?.map((session) => (
                  <div key={session?.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon name="Monitor" size={20} className="text-muted-foreground" />
                      <div>
                        <div className="font-medium text-foreground">{session?.device}</div>
                        <div className="text-sm text-muted-foreground">
                          {session?.location} • {session?.ip}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Started {new Date(session?.startTime)?.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        session?.status === 'active' ? 'text-success bg-success/10' : 'text-muted-foreground bg-muted'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          session?.status === 'active' ? 'bg-success' : 'bg-muted-foreground'
                        }`}></div>
                        {session?.status}
                      </span>
                      {session?.status === 'active' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => console.log('Terminate session:', session?.id)}
                        >
                          Terminate
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No active sessions</p>
              )}
            </div>
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="p-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Last updated: {new Date()?.toLocaleString()}
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              Reset
            </Button>
            <Button
              variant="default"
              onClick={() => onSavePermissions(selectedUser?.id)}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionPanel;