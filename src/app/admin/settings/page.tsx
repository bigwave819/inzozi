'use client';

import * as Dialog from '@radix-ui/react-dialog';
import * as Switch from '@radix-ui/react-switch';
import * as Tabs from '@radix-ui/react-tabs';
import { useState, useEffect } from 'react';
import { useThemeStore } from '@/store/theme-store';
import { useTheme } from 'next-themes';

export default function AdminSettingsPage() {
  const { isDarkMode, setDarkMode } = useThemeStore();
  const { setTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDarkModeToggle = (checked: boolean) => {
    setDarkMode(checked);
    setTheme(checked ? 'dark' : 'light');
  };

  if (!mounted) {
    return (
      <div className="p-6 max-w-4xl mx-auto min-h-screen bg-white dark:bg-gray-950">
        <h1 className="text-3xl font-bold mb-6">Admin Settings</h1>
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <h1 className="text-3xl font-bold mb-6">Admin Settings</h1>

      {/* Tabs */}
      <Tabs.Root defaultValue="profile" className="flex flex-col gap-4">
        <Tabs.List className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
          <Tabs.Trigger
            value="profile"
            className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 dark:data-[state=active]:border-blue-400 data-[state=active]:font-semibold text-gray-600 dark:text-gray-400 data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-100 transition-colors"
          >
            Profile
          </Tabs.Trigger>
          <Tabs.Trigger
            value="company"
            className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 dark:data-[state=active]:border-blue-400 data-[state=active]:font-semibold text-gray-600 dark:text-gray-400 data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-100 transition-colors"
          >
            Company
          </Tabs.Trigger>
          <Tabs.Trigger
            value="preferences"
            className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 dark:data-[state=active]:border-blue-400 data-[state=active]:font-semibold text-gray-600 dark:text-gray-400 data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-100 transition-colors"
          >
            Preferences
          </Tabs.Trigger>
        </Tabs.List>

        {/* Tab Contents */}
        <Tabs.Content value="profile" className="mt-4">
          <div className="flex flex-col gap-4">
            <label className="flex flex-col text-gray-700 dark:text-gray-300">
              Admin Name
              <input
                type="text"
                placeholder="Enter your name"
                className="mt-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
              />
            </label>
            <label className="flex flex-col text-gray-700 dark:text-gray-300">
              Email
              <input
                type="email"
                placeholder="admin@company.com"
                className="mt-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
              />
            </label>
            <Dialog.Root>
              <Dialog.Trigger className="mt-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors w-fit">
                Change Password
              </Dialog.Trigger>
              <Dialog.Overlay className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm" />
              <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-2xl max-w-sm w-full border border-gray-200 dark:border-gray-700">
                <Dialog.Title className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
                  Update Password
                </Dialog.Title>
                <input
                  type="password"
                  placeholder="New password"
                  className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 w-full mb-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
                <div className="flex justify-end gap-2">
                  <Dialog.Close className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors">
                    Cancel
                  </Dialog.Close>
                  <button className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                    Save
                  </button>
                </div>
              </Dialog.Content>
            </Dialog.Root>
          </div>
        </Tabs.Content>

        <Tabs.Content value="company" className="mt-4">
          <div className="flex flex-col gap-4">
            <label className="flex flex-col text-gray-700 dark:text-gray-300">
              Company Name
              <input
                type="text"
                placeholder="Tech Company Ltd"
                className="mt-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
              />
            </label>
            <label className="flex flex-col text-gray-700 dark:text-gray-300">
              Upload Logo
              <input 
                type="file" 
                className="mt-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-blue-900/50 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-900/70 transition-colors" 
              />
            </label>
          </div>
        </Tabs.Content>

        <Tabs.Content value="preferences" className="mt-4 flex flex-col gap-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div>
              <span className="font-medium text-gray-900 dark:text-gray-100">Dark Mode</span>
              <p className="text-sm text-gray-600 dark:text-gray-400">Toggle dark mode theme</p>
            </div>
            <Switch.Root
              checked={isDarkMode}
              onCheckedChange={handleDarkModeToggle}
              className="w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full relative data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-500 transition-colors"
            >
              <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow-lg transform translate-x-0.5 data-[state=checked]:translate-x-6 transition-transform duration-200" />
            </Switch.Root>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div>
              <span className="font-medium text-gray-900 dark:text-gray-100">Enable Notifications</span>
              <p className="text-sm text-gray-600 dark:text-gray-400">Receive system notifications</p>
            </div>
            <Switch.Root
              checked={notificationsEnabled}
              onCheckedChange={(checked) => setNotificationsEnabled(checked)}
              className="w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full relative data-[state=checked]:bg-green-600 dark:data-[state=checked]:bg-green-500 transition-colors"
            >
              <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow-lg transform translate-x-0.5 data-[state=checked]:translate-x-6 transition-transform duration-200" />
            </Switch.Root>
          </div>
        </Tabs.Content>
      </Tabs.Root>

      <button className="mt-8 px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium shadow-lg hover:shadow-xl transform hover:scale-105 duration-200">
        Save All Settings
      </button>
    </div>
  );
}