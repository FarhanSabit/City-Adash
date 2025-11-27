import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SecuritySettingsPanel = ({ settings, onUpdateSettings }) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [hasChanges, setHasChanges] = useState(false);

  const handleSettingChange = (category, key, value) => {
    setLocalSettings(prev => ({
      ...prev,
      [category]: {
        ...prev?.[category],
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    onUpdateSettings(localSettings);
    setHasChanges(false);
  };

  const handleReset = () => {
    setLocalSettings(settings);
    setHasChanges(false);
  };

  const sessionTimeoutOptions = [
    { value: '15', label: '15 minutes' },
    { value: '30', label: '30 minutes' },
    { value: '60', label: '1 hour' },
    { value: '120', label: '2 hours' },
    { value: '240', label: '4 hours' }
  ];

  const passwordExpiryOptions = [
    { value: '30', label: '30 days' },
    { value: '60', label: '60 days' },
    { value: '90', label: '90 days' },
    { value: '180', label: '180 days' },
    { value: 'never', label: 'Never expire' }
  ];

  return (
    <div className="space-y-6">
      {hasChanges && (
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="AlertTriangle" size={20} color="var(--color-warning)" />
            <span className="text-sm text-foreground">You have unsaved changes</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleReset}>
              Discard
            </Button>
            <Button variant="default" size="sm" iconName="Save" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      )}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <Icon name="Lock" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Password Policy</h3>
            <p className="text-sm text-muted-foreground">Configure password requirements and security rules</p>
          </div>
        </div>

        <div className="space-y-4">
          <Input
            label="Minimum Password Length"
            type="number"
            value={localSettings?.passwordPolicy?.minLength}
            onChange={(e) => handleSettingChange('passwordPolicy', 'minLength', e?.target?.value)}
            description="Minimum number of characters required"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Checkbox
              label="Require Uppercase Letters"
              checked={localSettings?.passwordPolicy?.requireUppercase}
              onChange={(e) => handleSettingChange('passwordPolicy', 'requireUppercase', e?.target?.checked)}
            />
            <Checkbox
              label="Require Lowercase Letters"
              checked={localSettings?.passwordPolicy?.requireLowercase}
              onChange={(e) => handleSettingChange('passwordPolicy', 'requireLowercase', e?.target?.checked)}
            />
            <Checkbox
              label="Require Numbers"
              checked={localSettings?.passwordPolicy?.requireNumbers}
              onChange={(e) => handleSettingChange('passwordPolicy', 'requireNumbers', e?.target?.checked)}
            />
            <Checkbox
              label="Require Special Characters"
              checked={localSettings?.passwordPolicy?.requireSpecialChars}
              onChange={(e) => handleSettingChange('passwordPolicy', 'requireSpecialChars', e?.target?.checked)}
            />
          </div>

          <Select
            label="Password Expiry Period"
            options={passwordExpiryOptions}
            value={localSettings?.passwordPolicy?.expiryDays}
            onChange={(value) => handleSettingChange('passwordPolicy', 'expiryDays', value)}
            description="How often users must change their password"
          />

          <Input
            label="Password History"
            type="number"
            value={localSettings?.passwordPolicy?.historyCount}
            onChange={(e) => handleSettingChange('passwordPolicy', 'historyCount', e?.target?.value)}
            description="Number of previous passwords to prevent reuse"
          />
        </div>
      </div>
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10">
            <Icon name="Clock" size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Session Management</h3>
            <p className="text-sm text-muted-foreground">Control user session behavior and timeouts</p>
          </div>
        </div>

        <div className="space-y-4">
          <Select
            label="Session Timeout"
            options={sessionTimeoutOptions}
            value={localSettings?.sessionManagement?.timeout}
            onChange={(value) => handleSettingChange('sessionManagement', 'timeout', value)}
            description="Automatically log out inactive users after this period"
          />

          <Checkbox
            label="Allow Concurrent Sessions"
            checked={localSettings?.sessionManagement?.allowConcurrent}
            onChange={(e) => handleSettingChange('sessionManagement', 'allowConcurrent', e?.target?.checked)}
            description="Allow users to be logged in from multiple devices simultaneously"
          />

          <Input
            label="Maximum Concurrent Sessions"
            type="number"
            value={localSettings?.sessionManagement?.maxConcurrent}
            onChange={(e) => handleSettingChange('sessionManagement', 'maxConcurrent', e?.target?.value)}
            disabled={!localSettings?.sessionManagement?.allowConcurrent}
            description="Maximum number of simultaneous sessions per user"
          />
        </div>
      </div>
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-success/10">
            <Icon name="ShieldCheck" size={20} color="var(--color-success)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Multi-Factor Authentication</h3>
            <p className="text-sm text-muted-foreground">Configure two-factor authentication requirements</p>
          </div>
        </div>

        <div className="space-y-4">
          <Checkbox
            label="Require MFA for All Users"
            checked={localSettings?.mfaSettings?.required}
            onChange={(e) => handleSettingChange('mfaSettings', 'required', e?.target?.checked)}
            description="Enforce two-factor authentication for all user accounts"
          />

          <Checkbox
            label="Require MFA for Administrators"
            checked={localSettings?.mfaSettings?.requiredForAdmins}
            onChange={(e) => handleSettingChange('mfaSettings', 'requiredForAdmins', e?.target?.checked)}
            description="Enforce MFA specifically for users with administrative privileges"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Checkbox
              label="Allow SMS Authentication"
              checked={localSettings?.mfaSettings?.allowSMS}
              onChange={(e) => handleSettingChange('mfaSettings', 'allowSMS', e?.target?.checked)}
            />
            <Checkbox
              label="Allow Authenticator Apps"
              checked={localSettings?.mfaSettings?.allowAuthenticator}
              onChange={(e) => handleSettingChange('mfaSettings', 'allowAuthenticator', e?.target?.checked)}
            />
            <Checkbox
              label="Allow Email Verification"
              checked={localSettings?.mfaSettings?.allowEmail}
              onChange={(e) => handleSettingChange('mfaSettings', 'allowEmail', e?.target?.checked)}
            />
            <Checkbox
              label="Allow Backup Codes"
              checked={localSettings?.mfaSettings?.allowBackupCodes}
              onChange={(e) => handleSettingChange('mfaSettings', 'allowBackupCodes', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-error/10">
            <Icon name="AlertOctagon" size={20} color="var(--color-error)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Account Lockout Policy</h3>
            <p className="text-sm text-muted-foreground">Configure automatic account lockout after failed login attempts</p>
          </div>
        </div>

        <div className="space-y-4">
          <Checkbox
            label="Enable Account Lockout"
            checked={localSettings?.lockoutPolicy?.enabled}
            onChange={(e) => handleSettingChange('lockoutPolicy', 'enabled', e?.target?.checked)}
            description="Automatically lock accounts after multiple failed login attempts"
          />

          <Input
            label="Failed Login Attempts Threshold"
            type="number"
            value={localSettings?.lockoutPolicy?.maxAttempts}
            onChange={(e) => handleSettingChange('lockoutPolicy', 'maxAttempts', e?.target?.value)}
            disabled={!localSettings?.lockoutPolicy?.enabled}
            description="Number of failed attempts before account lockout"
          />

          <Input
            label="Lockout Duration (minutes)"
            type="number"
            value={localSettings?.lockoutPolicy?.lockoutDuration}
            onChange={(e) => handleSettingChange('lockoutPolicy', 'lockoutDuration', e?.target?.value)}
            disabled={!localSettings?.lockoutPolicy?.enabled}
            description="How long accounts remain locked after threshold is reached"
          />
        </div>
      </div>
    </div>
  );
};

export default SecuritySettingsPanel;