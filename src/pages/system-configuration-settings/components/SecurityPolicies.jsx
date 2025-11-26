import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SecurityPolicies = () => {
  const [passwordPolicy, setPasswordPolicy] = useState({
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    preventReuse: 5,
    expirationDays: 90,
    lockoutAttempts: 5,
    lockoutDuration: 30
  });

  const [sessionSettings, setSessionSettings] = useState({
    timeoutMinutes: 60,
    maxConcurrentSessions: 3,
    requireReauth: true,
    reauthTimeoutMinutes: 480,
    rememberDevice: true,
    deviceTrustDays: 30
  });

  const [auditSettings, setAuditSettings] = useState({
    enableAuditLog: true,
    logLoginAttempts: true,
    logDataChanges: true,
    logSystemAccess: true,
    logExports: true,
    retentionDays: 2555, // 7 years for compliance
    enableRealTimeAlerts: true,
    alertThreshold: 10
  });

  const [complianceSettings, setComplianceSettings] = useState({
    template: 'sox_osha',
    dataEncryption: true,
    encryptionLevel: 'aes256',
    backupEncryption: true,
    accessReview: true,
    reviewFrequency: 90,
    dataRetention: true,
    retentionYears: 7
  });

  const [hasChanges, setHasChanges] = useState(false);

  const complianceTemplateOptions = [
    { value: 'sox_osha', label: 'SOX + OSHA Compliance' },
    { value: 'sox', label: 'SOX Compliance Only' },
    { value: 'osha', label: 'OSHA Compliance Only' },
    { value: 'iso27001', label: 'ISO 27001' },
    { value: 'custom', label: 'Custom Configuration' }
  ];

  const encryptionLevelOptions = [
    { value: 'aes128', label: 'AES-128' },
    { value: 'aes256', label: 'AES-256' },
    { value: 'rsa2048', label: 'RSA-2048' },
    { value: 'rsa4096', label: 'RSA-4096' }
  ];

  const handlePasswordPolicyUpdate = (field, value) => {
    setPasswordPolicy(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSessionSettingUpdate = (field, value) => {
    setSessionSettings(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleAuditSettingUpdate = (field, value) => {
    setAuditSettings(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleComplianceSettingUpdate = (field, value) => {
    setComplianceSettings(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const generatePasswordExample = () => {
    const { minLength, requireUppercase, requireLowercase, requireNumbers, requireSpecialChars } = passwordPolicy;
    let example = '';
    
    if (requireUppercase) example += 'A';
    if (requireLowercase) example += 'b';
    if (requireNumbers) example += '1';
    if (requireSpecialChars) example += '@';
    
    while (example?.length < minLength) {
      example += 'x';
    }
    
    return example + '...';
  };

  const handleSave = () => {
    console.log('Saving security policies:', {
      passwordPolicy,
      sessionSettings,
      auditSettings,
      complianceSettings
    });
    setHasChanges(false);
  };

  const testPasswordStrength = () => {
    console.log('Testing password strength with current policy');
    // Handle password strength testing logic here
  };

  return (
    <div className="space-y-8">
      {/* Password Policy */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Lock" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Password Policy</h3>
              <p className="text-sm text-muted-foreground">Configure password requirements and security rules</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={testPasswordStrength}
            iconName="Shield"
            iconPosition="left"
          >
            Test Policy
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Input
              label="Minimum Length"
              type="number"
              value={passwordPolicy?.minLength}
              onChange={(e) => handlePasswordPolicyUpdate('minLength', parseInt(e?.target?.value))}
              description="Minimum number of characters required"
            />
            
            <Input
              label="Password Expiration (days)"
              type="number"
              value={passwordPolicy?.expirationDays}
              onChange={(e) => handlePasswordPolicyUpdate('expirationDays', parseInt(e?.target?.value))}
              description="Days before password expires"
            />
            
            <Input
              label="Prevent Reuse (last N passwords)"
              type="number"
              value={passwordPolicy?.preventReuse}
              onChange={(e) => handlePasswordPolicyUpdate('preventReuse', parseInt(e?.target?.value))}
              description="Number of previous passwords to remember"
            />
          </div>
          
          <div className="space-y-4">
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-foreground">Character Requirements</h4>
              
              <Checkbox
                label="Require Uppercase Letters (A-Z)"
                checked={passwordPolicy?.requireUppercase}
                onChange={(e) => handlePasswordPolicyUpdate('requireUppercase', e?.target?.checked)}
              />
              
              <Checkbox
                label="Require Lowercase Letters (a-z)"
                checked={passwordPolicy?.requireLowercase}
                onChange={(e) => handlePasswordPolicyUpdate('requireLowercase', e?.target?.checked)}
              />
              
              <Checkbox
                label="Require Numbers (0-9)"
                checked={passwordPolicy?.requireNumbers}
                onChange={(e) => handlePasswordPolicyUpdate('requireNumbers', e?.target?.checked)}
              />
              
              <Checkbox
                label="Require Special Characters (!@#$%)"
                checked={passwordPolicy?.requireSpecialChars}
                onChange={(e) => handlePasswordPolicyUpdate('requireSpecialChars', e?.target?.checked)}
              />
            </div>
            
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Example valid password:</p>
              <code className="text-sm font-mono text-foreground">{generatePasswordExample()}</code>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-border">
          <Input
            label="Account Lockout Attempts"
            type="number"
            value={passwordPolicy?.lockoutAttempts}
            onChange={(e) => handlePasswordPolicyUpdate('lockoutAttempts', parseInt(e?.target?.value))}
            description="Failed attempts before account lockout"
          />
          
          <Input
            label="Lockout Duration (minutes)"
            type="number"
            value={passwordPolicy?.lockoutDuration}
            onChange={(e) => handlePasswordPolicyUpdate('lockoutDuration', parseInt(e?.target?.value))}
            description="How long account remains locked"
          />
        </div>
      </div>
      {/* Session Management */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
            <Icon name="Clock" size={20} className="text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Session Management</h3>
            <p className="text-sm text-muted-foreground">Configure user session timeouts and limits</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Input
              label="Session Timeout (minutes)"
              type="number"
              value={sessionSettings?.timeoutMinutes}
              onChange={(e) => handleSessionSettingUpdate('timeoutMinutes', parseInt(e?.target?.value))}
              description="Automatic logout after inactivity"
            />
            
            <Input
              label="Max Concurrent Sessions"
              type="number"
              value={sessionSettings?.maxConcurrentSessions}
              onChange={(e) => handleSessionSettingUpdate('maxConcurrentSessions', parseInt(e?.target?.value))}
              description="Maximum simultaneous logins per user"
            />
            
            <Checkbox
              label="Require Re-authentication"
              description="Require password for sensitive operations"
              checked={sessionSettings?.requireReauth}
              onChange={(e) => handleSessionSettingUpdate('requireReauth', e?.target?.checked)}
            />
          </div>
          
          <div className="space-y-4">
            <Input
              label="Re-auth Timeout (minutes)"
              type="number"
              value={sessionSettings?.reauthTimeoutMinutes}
              onChange={(e) => handleSessionSettingUpdate('reauthTimeoutMinutes', parseInt(e?.target?.value))}
              disabled={!sessionSettings?.requireReauth}
              description="How long re-authentication is valid"
            />
            
            <Checkbox
              label="Remember Trusted Devices"
              description="Allow users to trust devices for faster login"
              checked={sessionSettings?.rememberDevice}
              onChange={(e) => handleSessionSettingUpdate('rememberDevice', e?.target?.checked)}
            />
            
            <Input
              label="Device Trust Duration (days)"
              type="number"
              value={sessionSettings?.deviceTrustDays}
              onChange={(e) => handleSessionSettingUpdate('deviceTrustDays', parseInt(e?.target?.value))}
              disabled={!sessionSettings?.rememberDevice}
              description="How long devices remain trusted"
            />
          </div>
        </div>
      </div>
      {/* Audit & Logging */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="FileText" size={20} className="text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Audit & Logging</h3>
            <p className="text-sm text-muted-foreground">Configure system audit trails and logging</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Checkbox
              label="Enable Audit Logging"
              description="Log all system activities for compliance"
              checked={auditSettings?.enableAuditLog}
              onChange={(e) => handleAuditSettingUpdate('enableAuditLog', e?.target?.checked)}
            />
            
            <Checkbox
              label="Log Login Attempts"
              description="Record all login attempts (successful and failed)"
              checked={auditSettings?.logLoginAttempts}
              onChange={(e) => handleAuditSettingUpdate('logLoginAttempts', e?.target?.checked)}
              disabled={!auditSettings?.enableAuditLog}
            />
            
            <Checkbox
              label="Log Data Changes"
              description="Record all data modifications"
              checked={auditSettings?.logDataChanges}
              onChange={(e) => handleAuditSettingUpdate('logDataChanges', e?.target?.checked)}
              disabled={!auditSettings?.enableAuditLog}
            />
            
            <Checkbox
              label="Log System Access"
              description="Record system and feature access"
              checked={auditSettings?.logSystemAccess}
              onChange={(e) => handleAuditSettingUpdate('logSystemAccess', e?.target?.checked)}
              disabled={!auditSettings?.enableAuditLog}
            />
          </div>
          
          <div className="space-y-4">
            <Checkbox
              label="Log Data Exports"
              description="Record all data export activities"
              checked={auditSettings?.logExports}
              onChange={(e) => handleAuditSettingUpdate('logExports', e?.target?.checked)}
              disabled={!auditSettings?.enableAuditLog}
            />
            
            <Input
              label="Log Retention (days)"
              type="number"
              value={auditSettings?.retentionDays}
              onChange={(e) => handleAuditSettingUpdate('retentionDays', parseInt(e?.target?.value))}
              disabled={!auditSettings?.enableAuditLog}
              description="How long to keep audit logs (2555 days = 7 years)"
            />
            
            <Checkbox
              label="Real-time Security Alerts"
              description="Send alerts for suspicious activities"
              checked={auditSettings?.enableRealTimeAlerts}
              onChange={(e) => handleAuditSettingUpdate('enableRealTimeAlerts', e?.target?.checked)}
              disabled={!auditSettings?.enableAuditLog}
            />
            
            <Input
              label="Alert Threshold (events/hour)"
              type="number"
              value={auditSettings?.alertThreshold}
              onChange={(e) => handleAuditSettingUpdate('alertThreshold', parseInt(e?.target?.value))}
              disabled={!auditSettings?.enableRealTimeAlerts || !auditSettings?.enableAuditLog}
              description="Trigger alert after this many events"
            />
          </div>
        </div>
      </div>
      {/* Compliance Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Shield" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Compliance Settings</h3>
            <p className="text-sm text-muted-foreground">Configure regulatory compliance requirements</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Select
              label="Compliance Template"
              options={complianceTemplateOptions}
              value={complianceSettings?.template}
              onChange={(value) => handleComplianceSettingUpdate('template', value)}
              description="Pre-configured compliance settings"
            />
            
            <Checkbox
              label="Data Encryption at Rest"
              description="Encrypt all stored data"
              checked={complianceSettings?.dataEncryption}
              onChange={(e) => handleComplianceSettingUpdate('dataEncryption', e?.target?.checked)}
            />
            
            <Select
              label="Encryption Level"
              options={encryptionLevelOptions}
              value={complianceSettings?.encryptionLevel}
              onChange={(value) => handleComplianceSettingUpdate('encryptionLevel', value)}
              disabled={!complianceSettings?.dataEncryption}
              description="Encryption algorithm strength"
            />
            
            <Checkbox
              label="Backup Encryption"
              description="Encrypt all backup files"
              checked={complianceSettings?.backupEncryption}
              onChange={(e) => handleComplianceSettingUpdate('backupEncryption', e?.target?.checked)}
            />
          </div>
          
          <div className="space-y-4">
            <Checkbox
              label="Periodic Access Review"
              description="Regular review of user access rights"
              checked={complianceSettings?.accessReview}
              onChange={(e) => handleComplianceSettingUpdate('accessReview', e?.target?.checked)}
            />
            
            <Input
              label="Review Frequency (days)"
              type="number"
              value={complianceSettings?.reviewFrequency}
              onChange={(e) => handleComplianceSettingUpdate('reviewFrequency', parseInt(e?.target?.value))}
              disabled={!complianceSettings?.accessReview}
              description="Days between access reviews"
            />
            
            <Checkbox
              label="Data Retention Policy"
              description="Automatic data archival and deletion"
              checked={complianceSettings?.dataRetention}
              onChange={(e) => handleComplianceSettingUpdate('dataRetention', e?.target?.checked)}
            />
            
            <Input
              label="Retention Period (years)"
              type="number"
              value={complianceSettings?.retentionYears}
              onChange={(e) => handleComplianceSettingUpdate('retentionYears', parseInt(e?.target?.value))}
              disabled={!complianceSettings?.dataRetention}
              description="Years to retain data for compliance"
            />
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-border">
        <div className="flex items-center space-x-2">
          {hasChanges && (
            <>
              <Icon name="AlertCircle" size={16} className="text-warning" />
              <span className="text-sm text-warning">You have unsaved changes</span>
            </>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={() => setHasChanges(false)}
            disabled={!hasChanges}
          >
            Discard Changes
          </Button>
          <Button
            variant="default"
            onClick={handleSave}
            disabled={!hasChanges}
            iconName="Save"
            iconPosition="left"
          >
            Save Policies
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SecurityPolicies;