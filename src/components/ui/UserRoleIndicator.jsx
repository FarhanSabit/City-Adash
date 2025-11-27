import React, { useState } from 'react';
import Icon from '../AppIcon';

const UserRoleIndicator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userRole] = useState({
    name: 'AnnexManager',
    level: 'Administrator',
    permissions: ['Full Access', 'User Management', 'System Configuration'],
  });

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-all duration-150"
        aria-label="User role information"
        aria-expanded={isOpen}
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
          <Icon name="Shield" size={16} color="var(--color-primary)" />
        </div>
        <div className="hidden md:flex flex-col items-start">
          <span className="text-xs text-muted-foreground">Role</span>
          <span className="text-sm font-medium text-foreground">
            {userRole?.name}
          </span>
        </div>
        <Icon
          name={isOpen ? 'ChevronUp' : 'ChevronDown'}
          size={16}
          color="var(--color-muted-foreground)"
        />
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute top-full right-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-lg z-20 animation-fade-in">
            <div className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                  <Icon name="Shield" size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    {userRole?.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {userRole?.level}
                  </div>
                </div>
              </div>
              <div className="border-t border-border pt-3">
                <div className="text-xs font-medium text-muted-foreground mb-2">
                  Permissions
                </div>
                <div className="space-y-1">
                  {userRole?.permissions?.map((permission, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-xs text-foreground"
                    >
                      <Icon
                        name="Check"
                        size={14}
                        color="var(--color-success)"
                      />
                      {permission}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserRoleIndicator;