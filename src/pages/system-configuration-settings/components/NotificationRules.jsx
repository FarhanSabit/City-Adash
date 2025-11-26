import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const NotificationRules = () => {
  const [technicianName, setTechnicianName] = useState('');
  
  const [emailTemplates, setEmailTemplates] = useState([
    {
      id: 1,
      name: 'Work Order Assignment',
      subject: 'New Work Order Assigned: {{workOrderId}}',
      body: `Hello {{technicianName}},\n\nA new work order has been assigned to you:\n\nWork Order: {{workOrderId}}\nLocation: {{location}}\nPriority: {{priority}}\nDescription: {{description}}\n\nPlease review and begin work as soon as possible.\n\nBest regards,\nFacility Management Team`,
      active: true
    },
    {
      id: 2,
      name: 'Equipment Alert',
      subject: 'Equipment Alert: {{equipmentName}}',
      body: `Alert: Equipment requires attention\n\nEquipment: {{equipmentName}}\nLocation: {{location}}\nAlert Type: {{alertType}}\nSeverity: {{severity}}\n\nImmediate action may be required.\n\nFacility Management System`,
      active: true
    }
  ]);

  const [escalationRules, setEscalationRules] = useState([
    {
      id: 1,
      name: 'Critical Priority Escalation',
      priority: 'critical',
      timeThreshold: 2,
      escalateTo: 'supervisor',
      notificationMethod: 'email_sms',
      active: true
    },
    {
      id: 2,
      name: 'High Priority Escalation',
      priority: 'high',
      timeThreshold: 8,
      escalateTo: 'manager',
      notificationMethod: 'email',
      active: true
    }
  ]);

  const [recipientGroups, setRecipientGroups] = useState([
    {
      id: 1,
      name: 'Facility Managers',
      members: ['john.smith@company.com', 'sarah.johnson@company.com'],
      description: 'Primary facility management team'
    },
    {
      id: 2,
      name: 'Maintenance Supervisors',
      members: ['mike.wilson@company.com', 'lisa.brown@company.com'],
      description: 'Maintenance supervision team'
    }
  ]);

  const [notificationSettings, setNotificationSettings] = useState({
    emailEnabled: true,
    smsEnabled: true,
    pushEnabled: true,
    quietHours: { start: '22:00', end: '06:00' },
    batchNotifications: true,
    maxNotificationsPerHour: 10
  });

  const [hasChanges, setHasChanges] = useState(false);

  const priorityOptions = [
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const escalationTargetOptions = [
    { value: 'supervisor', label: 'Direct Supervisor' },
    { value: 'manager', label: 'Facility Manager' },
    { value: 'director', label: 'Operations Director' },
    { value: 'custom', label: 'Custom Group' }
  ];

  const notificationMethodOptions = [
    { value: 'email', label: 'Email Only' },
    { value: 'sms', label: 'SMS Only' },
    { value: 'email_sms', label: 'Email + SMS' },
    { value: 'push', label: 'Push Notification' },
    { value: 'all', label: 'All Methods' }
  ];

  const handleTemplateUpdate = (templateId, field, value) => {
    setEmailTemplates(prev => prev?.map(template => 
      template?.id === templateId ? { ...template, [field]: value } : template
    ));
    setHasChanges(true);
  };

  const handleEscalationUpdate = (ruleId, field, value) => {
    setEscalationRules(prev => prev?.map(rule => 
      rule?.id === ruleId ? { ...rule, [field]: value } : rule
    ));
    setHasChanges(true);
  };

  const handleNotificationSettingUpdate = (field, value) => {
    if (field?.includes('.')) {
      const [parent, child] = field?.split('.');
      setNotificationSettings(prev => ({
        ...prev,
        [parent]: { ...prev?.[parent], [child]: value }
      }));
    } else {
      setNotificationSettings(prev => ({ ...prev, [field]: value }));
    }
    setHasChanges(true);
  };

  const testTemplate = (templateId) => {
    const template = emailTemplates?.find(t => t?.id === templateId);
    console.log('Testing template:', template);
    // Handle template testing logic here
  };

  const addEscalationRule = () => {
    const newRule = {
      id: Date.now(),
      name: 'New Escalation Rule',
      priority: 'medium',
      timeThreshold: 24,
      escalateTo: 'supervisor',
      notificationMethod: 'email',
      active: false
    };
    setEscalationRules(prev => [...prev, newRule]);
    setHasChanges(true);
  };

  const removeEscalationRule = (ruleId) => {
    setEscalationRules(prev => prev?.filter(rule => rule?.id !== ruleId));
    setHasChanges(true);
  };

  const handleSave = () => {
    console.log('Saving notification rules:', {
      emailTemplates,
      escalationRules,
      recipientGroups,
      notificationSettings
    });
    setHasChanges(false);
  };

  return (
    <div className="space-y-8">
      {/* Email Templates */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Mail" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Email Templates</h3>
            <p className="text-sm text-muted-foreground">Configure notification email templates</p>
          </div>
        </div>

        <div className="space-y-6">
          {emailTemplates?.map((template) => (
            <div key={template?.id} className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Input
                    value={template?.name}
                    onChange={(e) => handleTemplateUpdate(template?.id, 'name', e?.target?.value)}
                    className="font-medium"
                  />
                  <Checkbox
                    label="Active"
                    checked={template?.active}
                    onChange={(e) => handleTemplateUpdate(template?.id, 'active', e?.target?.checked)}
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => testTemplate(template?.id)}
                  iconName="Send"
                  iconPosition="left"
                >
                  Test
                </Button>
              </div>
              
              <div className="space-y-4">
                <Input
                  label="Subject Line"
                  value={template?.subject}
                  onChange={(e) => handleTemplateUpdate(template?.id, 'subject', e?.target?.value)}
                  description="Use {{variable}} for dynamic content"
                />
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email Body</label>
                  <textarea
                    value={template?.body}
                    onChange={(e) => handleTemplateUpdate(template?.id, 'body', e?.target?.value)}
                    rows={6}
                    className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground resize-none"
                    placeholder="Email content with {{variables}}"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Available variables: {`{{technicianName}}, {{workOrderId}}, {{location}}, {{priority}}, {{description}}`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Escalation Rules */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={20} className="text-warning" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Escalation Rules</h3>
              <p className="text-sm text-muted-foreground">Configure automatic escalation triggers</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={addEscalationRule}
            iconName="Plus"
            iconPosition="left"
            size="sm"
          >
            Add Rule
          </Button>
        </div>

        <div className="space-y-4">
          {escalationRules?.map((rule) => (
            <div key={rule?.id} className="p-4 bg-muted/50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                <Input
                  label="Rule Name"
                  value={rule?.name}
                  onChange={(e) => handleEscalationUpdate(rule?.id, 'name', e?.target?.value)}
                />
                
                <Select
                  label="Priority"
                  options={priorityOptions}
                  value={rule?.priority}
                  onChange={(value) => handleEscalationUpdate(rule?.id, 'priority', value)}
                />
                
                <Input
                  label="Time Threshold (Hours)"
                  type="number"
                  value={rule?.timeThreshold}
                  onChange={(e) => handleEscalationUpdate(rule?.id, 'timeThreshold', parseInt(e?.target?.value))}
                />
                
                <Select
                  label="Escalate To"
                  options={escalationTargetOptions}
                  value={rule?.escalateTo}
                  onChange={(value) => handleEscalationUpdate(rule?.id, 'escalateTo', value)}
                />
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    label="Active"
                    checked={rule?.active}
                    onChange={(e) => handleEscalationUpdate(rule?.id, 'active', e?.target?.checked)}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEscalationRule(rule?.id)}
                    iconName="Trash2"
                    className="text-error hover:text-error"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Notification Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="Bell" size={20} className="text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Notification Settings</h3>
            <p className="text-sm text-muted-foreground">Configure global notification preferences</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Checkbox
              label="Email Notifications"
              description="Enable email notifications system-wide"
              checked={notificationSettings?.emailEnabled}
              onChange={(e) => handleNotificationSettingUpdate('emailEnabled', e?.target?.checked)}
            />
            
            <Checkbox
              label="SMS Notifications"
              description="Enable SMS notifications for urgent alerts"
              checked={notificationSettings?.smsEnabled}
              onChange={(e) => handleNotificationSettingUpdate('smsEnabled', e?.target?.checked)}
            />
            
            <Checkbox
              label="Push Notifications"
              description="Enable browser/mobile push notifications"
              checked={notificationSettings?.pushEnabled}
              onChange={(e) => handleNotificationSettingUpdate('pushEnabled', e?.target?.checked)}
            />
          </div>
          
          <div className="space-y-4">
            <Checkbox
              label="Batch Notifications"
              description="Group similar notifications together"
              checked={notificationSettings?.batchNotifications}
              onChange={(e) => handleNotificationSettingUpdate('batchNotifications', e?.target?.checked)}
            />
            
            <Input
              label="Max Notifications per Hour"
              type="number"
              value={notificationSettings?.maxNotificationsPerHour}
              onChange={(e) => handleNotificationSettingUpdate('maxNotificationsPerHour', parseInt(e?.target?.value))}
              description="Rate limit for notifications"
            />
            
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Quiet Hours Start"
                type="time"
                value={notificationSettings?.quietHours?.start}
                onChange={(e) => handleNotificationSettingUpdate('quietHours.start', e?.target?.value)}
              />
              <Input
                label="Quiet Hours End"
                type="time"
                value={notificationSettings?.quietHours?.end}
                onChange={(e) => handleNotificationSettingUpdate('quietHours.end', e?.target?.value)}
              />
            </div>
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
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationRules;