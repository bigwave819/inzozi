'use client';

import * as Dialog from '@radix-ui/react-dialog';
import * as Switch from '@radix-ui/react-switch';
import * as Tabs from '@radix-ui/react-tabs';
import { useState } from 'react';

export default function AdminSettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Settings</h1>

      {/* Tabs */}
      <Tabs.Root defaultValue="profile" className="flex flex-col gap-4">
        <Tabs.List className="flex gap-2 border-b border-gray-200">
          <Tabs.Trigger
            value="profile"
            className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:font-semibold"
          >
            Profile
          </Tabs.Trigger>
          <Tabs.Trigger
            value="company"
            className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:font-semibold"
          >
            Company
          </Tabs.Trigger>
          <Tabs.Trigger
            value="preferences"
            className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:font-semibold"
          >
            Preferences
          </Tabs.Trigger>
        </Tabs.List>

        {/* Tab Contents */}
        <Tabs.Content value="profile" className="mt-4">
          <div className="flex flex-col gap-4">
            <label className="flex flex-col">
              Admin Name
              <input
                type="text"
                placeholder="Enter your name"
                className="mt-1 border rounded px-3 py-2"
              />
            </label>
            <label className="flex flex-col">
              Email
              <input
                type="email"
                placeholder="admin@company.com"
                className="mt-1 border rounded px-3 py-2"
              />
            </label>
            <Dialog.Root>
              <Dialog.Trigger className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Change Password
              </Dialog.Trigger>
              <Dialog.Content className="bg-white p-6 rounded shadow-lg max-w-sm mx-auto mt-20">
                <Dialog.Title className="text-lg font-bold mb-2">
                  Update Password
                </Dialog.Title>
                <input
                  type="password"
                  placeholder="New password"
                  className="border rounded px-3 py-2 w-full mb-2"
                />
                <div className="flex justify-end gap-2">
                  <Dialog.Close className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                    Cancel
                  </Dialog.Close>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Save
                  </button>
                </div>
              </Dialog.Content>
            </Dialog.Root>
          </div>
        </Tabs.Content>

        <Tabs.Content value="company" className="mt-4">
          <div className="flex flex-col gap-4">
            <label className="flex flex-col">
              Company Name
              <input
                type="text"
                placeholder="Tech Company Ltd"
                className="mt-1 border rounded px-3 py-2"
              />
            </label>
            <label className="flex flex-col">
              Upload Logo
              <input type="file" className="mt-1 border rounded px-3 py-2" />
            </label>
          </div>
        </Tabs.Content>

        <Tabs.Content value="preferences" className="mt-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span>Dark Mode</span>
            <Switch.Root
              checked={darkMode}
              onCheckedChange={(checked) => setDarkMode(checked)}
              className="w-12 h-6 bg-gray-300 rounded-full relative data-[state=checked]:bg-blue-600 transition"
            >
              <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow-md transform translate-x-0 data-[state=checked]:translate-x-6 transition" />
            </Switch.Root>
          </div>
          <div className="flex items-center justify-between">
            <span>Enable Notifications</span>
            <Switch.Root
              checked={notificationsEnabled}
              onCheckedChange={(checked) => setNotificationsEnabled(checked)}
              className="w-12 h-6 bg-gray-300 rounded-full relative data-[state=checked]:bg-green-600 transition"
            >
              <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow-md transform translate-x-0 data-[state=checked]:translate-x-6 transition" />
            </Switch.Root>
          </div>
        </Tabs.Content>
      </Tabs.Root>

      <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Save All Settings
      </button>
    </div>
  );
}
