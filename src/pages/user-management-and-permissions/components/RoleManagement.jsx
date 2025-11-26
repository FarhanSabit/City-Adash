import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const RoleManagement = ({ roles, onCreateRole, onEditRole, onDeleteRole, onDuplicateRole }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: {}
  });

  const defaultPermissions = [
    {
      category: 'Work Orders',
      permissions: [
        { id: 'work_orders.view', name: 'View Work Orders', description: 'Can view all work orders' },
        { id: 'work_orders.create', name: 'Create Work Orders', description: 'Can create new work orders' },
        { id: 'work_orders.edit', name: 'Edit Work Orders', description: 'Can modify existing work orders' },
        { id: 'work_orders.delete', name: 'Delete Work Orders', description: 'Can delete work orders' },
        { id: 'work_orders.assign', name: 'Assign Work Orders', description: 'Can assign work orders to technicians' }
      ]
    },
    {
      category: 'Assets',
      permissions: [
        { id: 'assets.view', name: 'View Assets', description: 'Can view equipment and assets' },
        { id: 'assets.create', name: 'Create Assets', description: 'Can add new equipment to inventory' },
        { id: 'assets.edit', name: 'Edit Assets', description: 'Can modify asset information' },
        { id: 'assets.delete', name: 'Delete Assets', description: 'Can remove assets from system' }
      ]
    },
    {
      category: 'Reports',
      permissions: [
        { id: 'reports.view', name: 'View Reports', description: 'Can view standard reports' },
        { id: 'reports.create', name: 'Create Reports', description: 'Can create custom reports' },
        { id: 'reports.export', name: 'Export Reports', description: 'Can export report data' }
      ]
    },
    {
      category: 'Administration',
      permissions: [
        { id: 'admin.users', name: 'Manage Users', description: 'Can manage user accounts' },
        { id: 'admin.roles', name: 'Manage Roles', description: 'Can create and modify roles' },
        { id: 'admin.settings', name: 'System Settings', description: 'Can modify system configuration' }
      ]
    }
  ];

  const handleCreateRole = () => {
    if (newRole?.name?.trim()) {
      onCreateRole(newRole);
      setNewRole({ name: '', description: '', permissions: {} });
      setIsCreating(false);
    }
  };

  const handleEditRole = (role) => {
    setEditingRole(role);
    setNewRole({
      name: role?.name,
      description: role?.description,
      permissions: role?.permissions || {}
    });
  };

  const handleSaveEdit = () => {
    if (editingRole && newRole?.name?.trim()) {
      onEditRole(editingRole?.id, newRole);
      setEditingRole(null);
      setNewRole({ name: '', description: '', permissions: {} });
    }
  };

  const handlePermissionChange = (permissionId, checked) => {
    setNewRole(prev => ({
      ...prev,
      permissions: {
        ...prev?.permissions,
        [permissionId]: checked
      }
    }));
  };

  const getRoleIcon = (roleName) => {
    switch (roleName?.toLowerCase()) {
      case 'facility manager': return 'Building2';
      case 'maintenance supervisor': return 'UserCheck';
      case 'technician': return 'Wrench';
      case 'inventory manager': return 'Package';
      default: return 'Shield';
    }
  };

  const getRoleColor = (roleName) => {
    switch (roleName?.toLowerCase()) {
      case 'facility manager': return 'text-primary bg-primary/10';
      case 'maintenance supervisor': return 'text-secondary bg-secondary/10';
      case 'technician': return 'text-accent bg-accent/10';
      case 'inventory manager': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getPermissionCount = (role) => {
    const permissions = role?.permissions || {};
    const granted = Object.values(permissions)?.filter(Boolean)?.length;
    const total = defaultPermissions?.reduce((sum, category) => sum + category?.permissions?.length, 0);
    return `${granted}/${total}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Role Management</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Create and manage user roles with specific permissions
          </p>
        </div>
        <Button
          variant="default"
          iconName="Plus"
          iconPosition="left"
          onClick={() => setIsCreating(true)}
        >
          Create Role
        </Button>
      </div>
      {/* Create/Edit Role Form */}
      {(isCreating || editingRole) && (
        <div className="bg-card border border-border rounded-lg shadow-soft p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-foreground">
              {editingRole ? 'Edit Role' : 'Create New Role'}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsCreating(false);
                setEditingRole(null);
                setNewRole({ name: '', description: '', permissions: {} });
              }}
            >
              <Icon name="X" size={16} />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <Input
                label="Role Name"
                type="text"
                placeholder="Enter role name"
                value={newRole?.name}
                onChange={(e) => setNewRole(prev => ({ ...prev, name: e?.target?.value }))}
                required
              />
              <Input
                label="Description"
                type="text"
                placeholder="Enter role description"
                value={newRole?.description}
                onChange={(e) => setNewRole(prev => ({ ...prev, description: e?.target?.value }))}
              />
            </div>

            {/* Permissions */}
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Permissions</h4>
              <div className="max-h-80 overflow-y-auto space-y-4">
                {defaultPermissions?.map((category) => (
                  <div key={category?.category} className="space-y-2">
                    <h5 className="font-medium text-foreground text-sm">{category?.category}</h5>
                    <div className="space-y-2 ml-4">
                      {category?.permissions?.map((permission) => (
                        <div key={permission?.id} className="flex items-start space-x-2">
                          <Checkbox
                            checked={newRole?.permissions?.[permission?.id] || false}
                            onChange={(e) => handlePermissionChange(permission?.id, e?.target?.checked)}
                            className="mt-1"
                          />
                          <div>
                            <div className="text-sm font-medium text-foreground">{permission?.name}</div>
                            <div className="text-xs text-muted-foreground">{permission?.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={() => {
                setIsCreating(false);
                setEditingRole(null);
                setNewRole({ name: '', description: '', permissions: {} });
              }}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={editingRole ? handleSaveEdit : handleCreateRole}
              disabled={!newRole?.name?.trim()}
            >
              {editingRole ? 'Save Changes' : 'Create Role'}
            </Button>
          </div>
        </div>
      )}
      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles?.map((role) => (
          <div key={role?.id} className="bg-card border border-border rounded-lg shadow-soft p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getRoleColor(role?.name)}`}>
                  <Icon name={getRoleIcon(role?.name)} size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{role?.name}</h3>
                  <p className="text-sm text-muted-foreground">{role?.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditRole(role)}
                  className="h-8 w-8"
                >
                  <Icon name="Edit" size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDuplicateRole(role)}
                  className="h-8 w-8"
                >
                  <Icon name="Copy" size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteRole(role?.id)}
                  className="h-8 w-8 text-error hover:text-error"
                >
                  <Icon name="Trash2" size={14} />
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Users with this role</span>
                <span className="text-sm font-medium text-foreground">{role?.userCount || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Permissions granted</span>
                <span className="text-sm font-medium text-foreground">{getPermissionCount(role)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Last modified</span>
                <span className="text-sm font-medium text-foreground">
                  {new Date(role.lastModified)?.toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => console.log('View role details:', role?.id)}
              >
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleManagement;