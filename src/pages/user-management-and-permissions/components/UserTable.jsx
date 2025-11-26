import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const UserTable = ({ users, selectedUsers, onUserSelect, onSelectAll, onUserEdit, onUserDelete, onBulkAction }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const filteredUsers = users?.filter(user =>
    user?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    user?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    user?.department?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    user?.role?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const sortedUsers = [...filteredUsers]?.sort((a, b) => {
    const aValue = a?.[sortField];
    const bValue = b?.[sortField];
    const direction = sortDirection === 'asc' ? 1 : -1;
    
    if (typeof aValue === 'string') {
      return aValue?.localeCompare(bValue) * direction;
    }
    return (aValue - bValue) * direction;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-success bg-success/10';
      case 'Inactive': return 'text-muted-foreground bg-muted';
      case 'Suspended': return 'text-warning bg-warning/10';
      case 'Pending': return 'text-accent bg-accent/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Facility Manager': return 'text-primary bg-primary/10';
      case 'Maintenance Supervisor': return 'text-secondary bg-secondary/10';
      case 'Technician': return 'text-accent bg-accent/10';
      case 'Inventory Manager': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const formatLastLogin = (timestamp) => {
    if (!timestamp) return 'Never';
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date?.toLocaleDateString();
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">User Directory</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Manage user accounts and access permissions
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              iconName="Download"
              iconPosition="left"
              onClick={() => onBulkAction('export')}
            >
              Export
            </Button>
            <Button
              variant="default"
              iconName="UserPlus"
              iconPosition="left"
              onClick={() => onBulkAction('add')}
            >
              Add User
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="w-80"
              />
              <Icon 
                name="Search" 
                size={16} 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
            </div>
            {selectedUsers?.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {selectedUsers?.length} selected
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Edit"
                  onClick={() => onBulkAction('edit')}
                >
                  Bulk Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  iconName="Trash2"
                  onClick={() => onBulkAction('delete')}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            {sortedUsers?.length} of {users?.length} users
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="w-12 p-4">
                <Checkbox
                  checked={selectedUsers?.length === users?.length}
                  indeterminate={selectedUsers?.length > 0 && selectedUsers?.length < users?.length}
                  onChange={(e) => onSelectAll(e?.target?.checked)}
                />
              </th>
              <th className="text-left p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('name')}
                  className="font-medium text-foreground hover:text-primary"
                >
                  User
                  <Icon 
                    name={sortField === 'name' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                    className="ml-1" 
                  />
                </Button>
              </th>
              <th className="text-left p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('role')}
                  className="font-medium text-foreground hover:text-primary"
                >
                  Role
                  <Icon 
                    name={sortField === 'role' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                    className="ml-1" 
                  />
                </Button>
              </th>
              <th className="text-left p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('department')}
                  className="font-medium text-foreground hover:text-primary"
                >
                  Department
                  <Icon 
                    name={sortField === 'department' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                    className="ml-1" 
                  />
                </Button>
              </th>
              <th className="text-left p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('lastLogin')}
                  className="font-medium text-foreground hover:text-primary"
                >
                  Last Login
                  <Icon 
                    name={sortField === 'lastLogin' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                    className="ml-1" 
                  />
                </Button>
              </th>
              <th className="text-left p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('status')}
                  className="font-medium text-foreground hover:text-primary"
                >
                  Status
                  <Icon 
                    name={sortField === 'status' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                    className="ml-1" 
                  />
                </Button>
              </th>
              <th className="w-24 p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers?.map((user) => (
              <tr 
                key={user?.id} 
                className="border-b border-border hover:bg-muted/30 transition-colors"
              >
                <td className="p-4">
                  <Checkbox
                    checked={selectedUsers?.includes(user?.id)}
                    onChange={(e) => onUserSelect(user?.id, e?.target?.checked)}
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary-foreground">
                        {user?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{user?.name}</div>
                      <div className="text-sm text-muted-foreground">{user?.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user?.role)}`}>
                    {user?.role}
                  </span>
                </td>
                <td className="p-4">
                  <div className="text-sm text-foreground">{user?.department}</div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-foreground">{formatLastLogin(user?.lastLogin)}</div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user?.status)}`}>
                    <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${user?.status === 'Active' ? 'bg-success' : user?.status === 'Suspended' ? 'bg-warning' : 'bg-muted-foreground'}`}></div>
                    {user?.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onUserEdit(user)}
                      className="h-8 w-8"
                    >
                      <Icon name="Edit" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onUserDelete(user)}
                      className="h-8 w-8 text-error hover:text-error"
                    >
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between p-4 border-t border-border">
        <div className="text-sm text-muted-foreground">
          Showing {Math.min(sortedUsers?.length, 10)} of {sortedUsers?.length} users
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            <Icon name="ChevronLeft" size={14} />
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
            <Icon name="ChevronRight" size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserTable;