import React from 'react'

const Settings = () => {
  return (
    <div className="min-h-screen bg-[#2B2B2B] text-[#F1EFE7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        
        <div className="bg-[#3B3B3B] rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-1">Email</label>
              <input type="email" className="w-full bg-[#2B2B2B] rounded px-3 py-2" placeholder="your@email.com" />
            </div>
            <div>
              <label className="block mb-1">Password</label>
              <button className="bg-[#F1EFE7] text-[#2B2B2B] px-4 py-2 rounded hover:bg-opacity-90">Change Password</button>
            </div>
          </div>
        </div>
        
        <div className="bg-[#3B3B3B] rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">API Key</h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-1">Your API Key</label>
              <input type="text" className="w-full bg-[#2B2B2B] rounded px-3 py-2" placeholder="Enter your API key" />
            </div>
            <button className="bg-[#F1EFE7] text-[#2B2B2B] px-4 py-2 rounded hover:bg-opacity-90">Save API Key</button>
          </div>
        </div>
        
        <div className="bg-[#3B3B3B] rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Preferences</h2>
          <div className="space-y-4">
            <div>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Receive email notifications
              </label>
            </div>
            <div>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Dark mode (always on)
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings