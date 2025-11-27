import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

import { Checkbox } from '../../../components/ui/Checkbox';

const IntegrationSettings = () => {
  const [integrations, setIntegrations] = useState([
    {
      id: 1,
      name: 'ERP System',
      type: 'erp',
      status: 'connected',
      endpoint: 'https://api.company-erp.com/v1',
      apiKey: '••••••••••••••••',
      lastSync: '2025-01-07T10:30:00Z',
      syncInterval: 60,
      enabled: true
    },
    {
      id: 2,
      name: 'CMMS Legacy',
      type: 'cmms',
      status: 'error',
      endpoint: 'https://legacy-cmms.company.com/api',
      apiKey: '••••••••••••••••',
      lastSync: '2025-01-06T15:45:00Z',
      syncInterval: 120,
      enabled: true
    },
    {
      id: 3,
      name: 'IoT Platform',
      type: 'iot',
      status: 'connected',
      endpoint: 'wss://iot-sensors.company.com/stream',
      apiKey: '••••••••••••••••',
      lastSync: '2025-01-07T12:31:00Z',
      syncInterval: 5,
      enabled: true
    },
    {
      id: 4,
      name: 'Active Directory',
      type: 'auth',
      status: 'disconnected',
      endpoint: 'ldap://ad.company.com:389',
      apiKey: '••••••••••••••••',
      lastSync: null,
      syncInterval: 1440,
      enabled: false
    }
  ]);

  const [syncSettings, setSyncSettings] = useState({
    autoRetry: true,
    maxRetries: 3,
    retryInterval: 300,
    batchSize: 100,
    timeoutSeconds: 30,
    enableLogging: true,
    logRetentionDays: 30
  });

  const [hasChanges, setHasChanges] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-success';
      case 'error': return 'text-error';
      case 'disconnected': return 'text-muted-foreground';
      case 'syncing': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected': return 'CheckCircle';
      case 'error': return 'XCircle';
      case 'disconnected': return 'Circle';
      case 'syncing': return 'RefreshCw';
      default: return 'Circle';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'erp': return 'Database';
      case 'cmms': return 'Settings';
      case 'iot': return 'Wifi';
      case 'auth': return 'Shield';
      default: return 'Link';
    }
  };

  const handleIntegrationUpdate = (integrationId, field, value) => {
    setIntegrations(prev => prev?.map(integration => 
      integration?.id === integrationId ? { ...integration, [field]: value } : integration
    ));
    setHasChanges(true);
  };

  const handleSyncSettingUpdate = (field, value) => {
    setSyncSettings(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const testConnection = (integrationId) => {
    const integration = integrations?.find(i => i?.id === integrationId);
    console.log('Testing connection for:', integration);
    
    // Simulate connection test
    setIntegrations(prev => prev?.map(i => 
      i?.id === integrationId ? { ...i, status: 'syncing' } : i
    ));
    
    setTimeout(() => {
      setIntegrations(prev => prev?.map(i => 
        i?.id === integrationId ? { ...i, status: 'connected', lastSync: new Date()?.toISOString() } : i
      ));
    }, 2000);
  };

  const forceSyncNow = (integrationId) => {
    const integration = integrations?.find(i => i?.id === integrationId);
    console.log('Force syncing:', integration);
    
    setIntegrations(prev => prev?.map(i => 
      i?.id === integrationId ? { ...i, status: 'syncing' } : i
    ));
    
    setTimeout(() => {
      setIntegrations(prev => prev?.map(i => 
        i?.id === integrationId ? { ...i, status: 'connected', lastSync: new Date()?.toISOString() } : i
      ));
    }, 3000);
  };

  const formatLastSync = (timestamp) => {
    if (!timestamp) return 'Never';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
    return `${Math.floor(diffMinutes / 1440)}d ago`;
  };

  const handleSave = () => {
    console.log('Saving integration settings:', {
      integrations,
      syncSettings
    });
    setHasChanges(false);
  };

  return (
    <div className="space-y-8">
      {/* Integration Status */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Link" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">System Integrations</h3>
            <p className="text-sm text-muted-foreground">Manage external system connections and API settings</p>
          </div>
        </div>

        <div className="space-y-4">
          {integrations?.map((integration) => (
            <div key={integration?.id} className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <Icon name={getTypeIcon(integration?.type)} size={20} className="text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-foreground">{integration?.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Icon 
                        name={getStatusIcon(integration?.status)} 
                        size={14} 
                        className={getStatusColor(integration?.status)}
                      />
                      <span className={`text-sm capitalize ${getStatusColor(integration?.status)}`}>
                        {integration?.status}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        • Last sync: {formatLastSync(integration?.lastSync)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    label="Enabled"
                    checked={integration?.enabled}
                    onChange={(e) => handleIntegrationUpdate(integration?.id, 'enabled', e?.target?.checked)}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => testConnection(integration?.id)}
                    iconName="Zap"
                    disabled={integration?.status === 'syncing'}
                  >
                    Test
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => forceSyncNow(integration?.id)}
                    iconName="RefreshCw"
                    disabled={integration?.status === 'syncing' || !integration?.enabled}
                  >
                    Sync
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Endpoint URL"
                  value={integration?.endpoint}
                  onChange={(e) => handleIntegrationUpdate(integration?.id, 'endpoint', e?.target?.value)}
                  disabled={!integration?.enabled}
                />
                
                <Input
                  label="API Key"
                  type="password"
                  value={integration?.apiKey}
                  onChange={(e) => handleIntegrationUpdate(integration?.id, 'apiKey', e?.target?.value)}
                  disabled={!integration?.enabled}
                />
                
                <Input
                  label="Sync Interval (minutes)"
                  type="number"
                  value={integration?.syncInterval}
                  onChange={(e) => handleIntegrationUpdate(integration?.id, 'syncInterval', parseInt(e?.target?.value))}
                  disabled={!integration?.enabled}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Sync Configuration */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="RefreshCw" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Synchronization Settings</h3>
            <p className="text-sm text-muted-foreground">Configure data synchronization parameters</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Checkbox
              label="Auto-Retry Failed Syncs"
              description="Automatically retry failed synchronization attempts"
              checked={syncSettings?.autoRetry}
              onChange={(e) => handleSyncSettingUpdate('autoRetry', e?.target?.checked)}
            />
            
            <Input
              label="Maximum Retry Attempts"
              type="number"
              value={syncSettings?.maxRetries}
              onChange={(e) => handleSyncSettingUpdate('maxRetries', parseInt(e?.target?.value))}
              disabled={!syncSettings?.autoRetry}
              description="Number of retry attempts before marking as failed"
            />
            
            <Input
              label="Retry Interval (seconds)"
              type="number"
              value={syncSettings?.retryInterval}
              onChange={(e) => handleSyncSettingUpdate('retryInterval', parseInt(e?.target?.value))}
              disabled={!syncSettings?.autoRetry}
              description="Wait time between retry attempts"
            />
          </div>
          
          <div className="space-y-4">
            <Input
              label="Batch Size"
              type="number"
              value={syncSettings?.batchSize}
              onChange={(e) => handleSyncSettingUpdate('batchSize', parseInt(e?.target?.value))}
              description="Number of records to process per batch"
            />
            
            <Input
              label="Request Timeout (seconds)"
              type="number"
              value={syncSettings?.timeoutSeconds}
              onChange={(e) => handleSyncSettingUpdate('timeoutSeconds', parseInt(e?.target?.value))}
              description="Maximum time to wait for API responses"
            />
            
            <Checkbox
              label="Enable Detailed Logging"
              description="Log detailed synchronization activities"
              checked={syncSettings?.enableLogging}
              onChange={(e) => handleSyncSettingUpdate('enableLogging', e?.target?.checked)}
            />
            
            <Input
              label="Log Retention (days)"
              type="number"
              value={syncSettings?.logRetentionDays}
              onChange={(e) => handleSyncSettingUpdate('logRetentionDays', parseInt(e?.target?.value))}
              disabled={!syncSettings?.enableLogging}
              description="How long to keep synchronization logs"
            />
          </div>
        </div>
      </div>
      {/* Connection Monitoring */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="Activity" size={20} className="text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Connection Monitoring</h3>
            <p className="text-sm text-muted-foreground">Real-time integration status and health metrics</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-success/10 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm font-medium text-success">Connected</span>
            </div>
            <p className="text-2xl font-bold text-foreground">2</p>
            <p className="text-xs text-muted-foreground">Active integrations</p>
          </div>
          
          <div className="p-4 bg-error/10 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="XCircle" size={16} className="text-error" />
              <span className="text-sm font-medium text-error">Errors</span>
            </div>
            <p className="text-2xl font-bold text-foreground">1</p>
            <p className="text-xs text-muted-foreground">Failed connections</p>
          </div>
          
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Circle" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Disabled</span>
            </div>
            <p className="text-2xl font-bold text-foreground">1</p>
            <p className="text-xs text-muted-foreground">Inactive integrations</p>
          </div>
          
          <div className="p-4 bg-accent/10 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Clock" size={16} className="text-accent" />
              <span className="text-sm font-medium text-accent">Avg Response</span>
            </div>
            <p className="text-2xl font-bold text-foreground">245ms</p>
            <p className="text-xs text-muted-foreground">API response time</p>
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

export default IntegrationSettings;