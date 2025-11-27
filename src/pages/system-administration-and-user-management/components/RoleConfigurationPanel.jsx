import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const RoleConfigurationPanel = ({ roles, onUpdateRole, onCreateRole }) => {
  const [selectedRole, setSelectedRole] = useState(roles?.[0]);
  const [isEditing, setIsEditing] = useState(false);

  const permissionCategories = [
    {
      category: 'User Management',
      permissions: [
        { id: 'user_view', label: 'View Users', description: 'View user profiles and information' },
        { id: 'user_create', label: 'Create Users', description: 'Add new users to the system' },
        { id: 'user_edit', label: 'Edit Users', description: 'Modify user information and settings' },
        { id: 'user_delete', label: 'Delete Users', description: 'Remove users from the system' },
        { id: 'user_roles', label: 'Manage Roles', description: 'Assign and modify user roles' }
      ]
    },
    {
      category: 'Work Orders',
      permissions: [
        { id: 'wo_view', label: 'View Work Orders', description: 'Access work order information' },
        { id: 'wo_create', label: 'Create Work Orders', description: 'Generate new work orders' },
        { id: 'wo_assign', label: 'Assign Work Orders', description: 'Assign tasks to technicians' },
        { id: 'wo_approve', label: 'Approve Work Orders', description: 'Approve work order requests' },
        { id: 'wo_close', label: 'Close Work Orders', description: 'Mark work orders as complete' }
      ]
    },
    {
      category: 'Assets & Inventory',
      permissions: [
        { id: 'asset_view', label: 'View Assets', description: 'Access asset information' },
        { id: 'asset_create', label: 'Create Assets', description: 'Add new assets to inventory' },
        { id: 'asset_edit', label: 'Edit Assets', description: 'Modify asset details' },
        { id: 'asset_delete', label: 'Delete Assets', description: 'Remove assets from system' },
        { id: 'inventory_manage', label: 'Manage Inventory', description: 'Control stock levels and orders' }
      ]
    },
    {
      category: 'Reports & Analytics',
      permissions: [
        { id: 'report_view', label: 'View Reports', description: 'Access standard reports' },
        { id: 'report_create', label: 'Create Reports', description: 'Generate custom reports' },
        { id: 'report_export', label: 'Export Reports', description: 'Download report data' },
        { id: 'analytics_view', label: 'View Analytics', description: 'Access analytics dashboards' }
      ]
    },
    {
      category: 'System Administration',
      permissions: [
        { id: 'system_config', label: 'System Configuration', description: 'Modify system settings' },
        { id: 'security_manage', label: 'Security Management', description: 'Configure security policies' },
        { id: 'integration_manage', label: 'Integration Management', description: 'Manage external integrations' },
        { id: 'audit_view', label: 'View Audit Logs', description: 'Access system audit trails' }
      ]
    }
  ];

  const handlePermissionToggle = (permissionId) => {
    const updatedPermissions = selectedRole?.permissions?.includes(permissionId)
      ? selectedRole?.permissions?.filter(p => p !== permissionId)
      : [...selectedRole?.permissions, permissionId];

    setSelectedRole({ ...selectedRole, permissions: updatedPermissions });
  };

  const handleSaveRole = () => {
    onUpdateRole(selectedRole);
    setIsEditing(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1">
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Roles</h3>
            <Button
              variant="ghost"
              size="sm"
              iconName="Plus"
              onClick={onCreateRole}
            >
              Add
            </Button>
          </div>
          <div className="space-y-2">
            {roles?.map((role) => (
              <button
                key={role?.id}
                onClick={() => {
                  setSelectedRole(role);
                  setIsEditing(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                  selectedRole?.id === role?.id
                    ? 'bg-primary/10 text-primary' :'hover:bg-muted text-foreground'
                }`}
              >
                <Icon
                  name={role?.icon}
                  size={18}
                  color={selectedRole?.id === role?.id ? 'var(--color-primary)' : 'var(--color-muted-foreground)'}
                />
                <div className="flex-1">
                  <div className="text-sm font-medium">{role?.name}</div>
                  <div className="text-xs text-muted-foreground">{role?.userCount} users</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="lg:col-span-3">
        <div className="bg-card rounded-lg border border-border">
          <div className="p-6 border-b border-border">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{selectedRole?.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedRole?.description}</p>
              </div>
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button variant="default" size="sm" iconName="Save" onClick={handleSaveRole}>
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" size="sm" iconName="Edit2" onClick={() => setIsEditing(true)}>
                    Edit Role
                  </Button>
                )}
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Icon name="Users" size={16} color="var(--color-muted-foreground)" />
                <span className="text-muted-foreground">{selectedRole?.userCount} users assigned</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Shield" size={16} color="var(--color-muted-foreground)" />
                <span className="text-muted-foreground">{selectedRole?.permissions?.length} permissions granted</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h4 className="text-sm font-semibold text-foreground mb-4">Permissions</h4>
            <div className="space-y-6">
              {permissionCategories?.map((category) => (
                <div key={category?.category}>
                  <h5 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                    <Icon name="FolderOpen" size={16} color="var(--color-primary)" />
                    {category?.category}
                  </h5>
                  <div className="space-y-3 ml-6">
                    {category?.permissions?.map((permission) => (
                      <div key={permission?.id} className="flex items-start gap-3">
                        <Checkbox
                          checked={selectedRole?.permissions?.includes(permission?.id)}
                          onChange={() => handlePermissionToggle(permission?.id)}
                          disabled={!isEditing}
                        />
                        <div className="flex-1">
                          <label className="text-sm font-medium text-foreground cursor-pointer">
                            {permission?.label}
                          </label>
                          <p className="text-xs text-muted-foreground mt-0.5">{permission?.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleConfigurationPanel;