import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const UserManagementTable = ({ users, onEditUser, onDeleteUser, onBulkAction }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const roleOptions = [
    { value: 'all', label: 'All Roles' },
    { value: 'admin', label: 'Administrator' },
    { value: 'manager', label: 'Facility Manager' },
    { value: 'technician', label: 'Maintenance Technician' },
    { value: 'supervisor', label: 'Operations Supervisor' },
    { value: 'staff', label: 'Administrative Staff' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'suspended', label: 'Suspended' }
  ];

  const filteredUsers = users?.filter(user => {
    const matchesSearch = user?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         user?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         user?.employeeId?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesRole = filterRole === 'all' || user?.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user?.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleSelectAll = (e) => {
    if (e?.target?.checked) {
      setSelectedUsers(filteredUsers?.map(u => u?.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev =>
      prev?.includes(userId)
        ? prev?.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'var(--color-success)';
      case 'inactive': return 'var(--color-muted-foreground)';
      case 'suspended': return 'var(--color-error)';
      default: return 'var(--color-muted-foreground)';
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-error/10 text-error';
      case 'manager': return 'bg-primary/10 text-primary';
      case 'supervisor': return 'bg-accent/10 text-accent';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-4 border-b border-border">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex-1 w-full lg:w-auto">
            <Input
              type="search"
              placeholder="Search by name, email, or employee ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <Select
              options={roleOptions}
              value={filterRole}
              onChange={setFilterRole}
              placeholder="Filter by role"
              className="w-full sm:w-48"
            />
            <Select
              options={statusOptions}
              value={filterStatus}
              onChange={setFilterStatus}
              placeholder="Filter by status"
              className="w-full sm:w-48"
            />
          </div>
        </div>
        {selectedUsers?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 items-center">
            <span className="text-sm text-muted-foreground">
              {selectedUsers?.length} user{selectedUsers?.length > 1 ? 's' : ''} selected
            </span>
            <Button
              variant="outline"
              size="sm"
              iconName="UserCheck"
              onClick={() => onBulkAction('activate', selectedUsers)}
            >
              Activate
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="UserX"
              onClick={() => onBulkAction('deactivate', selectedUsers)}
            >
              Deactivate
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Shield"
              onClick={() => onBulkAction('changeRole', selectedUsers)}
            >
              Change Role
            </Button>
            <Button
              variant="destructive"
              size="sm"
              iconName="Trash2"
              onClick={() => onBulkAction('delete', selectedUsers)}
            >
              Delete
            </Button>
          </div>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th className="w-12">
                <input
                  type="checkbox"
                  checked={selectedUsers?.length === filteredUsers?.length && filteredUsers?.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 rounded border-border"
                  aria-label="Select all users"
                />
              </th>
              <th>User</th>
              <th>Employee ID</th>
              <th>Role</th>
              <th>Department</th>
              <th>Permission Level</th>
              <th>Last Login</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.map((user) => (
              <tr key={user?.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedUsers?.includes(user?.id)}
                    onChange={() => handleSelectUser(user?.id)}
                    className="w-4 h-4 rounded border-border"
                    aria-label={`Select ${user?.name}`}
                  />
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <Image
                      src={user?.avatar}
                      alt={user?.avatarAlt}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium text-foreground">{user?.name}</div>
                      <div className="text-xs text-muted-foreground">{user?.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="font-mono text-sm text-foreground">{user?.employeeId}</span>
                </td>
                <td>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user?.role)}`}>
                    {user?.roleLabel}
                  </span>
                </td>
                <td>
                  <span className="text-sm text-foreground">{user?.department}</span>
                </td>
                <td>
                  <span className="text-sm text-muted-foreground">{user?.permissionLevel}</span>
                </td>
                <td>
                  <span className="text-sm text-muted-foreground">{user?.lastLogin}</span>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: getStatusColor(user?.status) }}
                    />
                    <span className="text-sm capitalize text-foreground">{user?.status}</span>
                  </div>
                </td>
                <td>
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEditUser(user)}
                      className="p-2 rounded-lg hover:bg-muted transition-colors"
                      aria-label={`Edit ${user?.name}`}
                    >
                      <Icon name="Edit2" size={16} color="var(--color-primary)" />
                    </button>
                    <button
                      onClick={() => onDeleteUser(user?.id)}
                      className="p-2 rounded-lg hover:bg-muted transition-colors"
                      aria-label={`Delete ${user?.name}`}
                    >
                      <Icon name="Trash2" size={16} color="var(--color-error)" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredUsers?.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="Users" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <p className="text-muted-foreground">No users found matching your criteria</p>
        </div>
      )}
      <div className="p-4 border-t border-border flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          Showing {filteredUsers?.length} of {users?.length} users
        </span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" iconName="ChevronLeft">
            Previous
          </Button>
          <Button variant="outline" size="sm" iconName="ChevronRight" iconPosition="right">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserManagementTable;