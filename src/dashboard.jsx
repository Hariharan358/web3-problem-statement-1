'use client'

import { useState } from 'react'
import { 
  Users, 
  FileText, 
  IndianRupeeIcon, 
  AlertCircle, 
  Bell, 
  Search, 
  Menu,
  X
} from 'lucide-react'
import { useNavigate } from 'react-router-dom' // Import useNavigate

const sidebarItems = [
  { name: 'Dashboard', icon: FileText },
  { name: 'Policies', icon: FileText },
  { name: 'Claims', icon: AlertCircle },
  { name: 'Customers', icon: Users },
  { name: 'Reports', icon: FileText },
]

const recentActivities = [
  { id: 1, action: 'New policy created', policy: 'Home Insurance', customer: 'John Doe' },
  { id: 2, action: 'Claim submitted', policy: 'Auto Insurance', customer: 'Jane Smith' },
  { id: 3, action: 'Policy renewed', policy: 'Life Insurance', customer: 'Bob Johnson' },
]

export default function InsuranceDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div className="flex h-screen w-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`bg-indigo-700 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out`}>
        <nav>
          <div className="text-2xl font-semibold text-center mb-6">InsureCo</div>
          {sidebarItems.map((item) => (
            <a
              key={item.name}
              href="#"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-600 hover:text-white"
            >
              <item.icon className="inline-block mr-2 h-5 w-5" />
              {item.name}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-md">
          <div className="flex items-center justify-between p-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-500 focus:outline-none focus:text-gray-700 md:hidden"
            >
              {isSidebarOpen ? <X /> : <Menu />}
            </button>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Search className="h-5 w-5 text-gray-500" />
              </span>
              <input
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
                type="text"
                placeholder="Search"
              />
            </div>
            <div className="flex items-center">
              <button className="flex mx-4 text-gray-600 focus:outline-none">
                <Bell className="h-6 w-6" />
              </button>
              <div className="relative">
                <button className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300">
                  <img
                    className="h-8 w-8 rounded-full object-cover"
                    src="/placeholder.svg?height=32&width=32"
                    alt="User avatar"
                  />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <h3 className="text-gray-700 text-3xl font-medium">Dashboard</h3>

            <div className="mt-4">
              <div className="flex flex-wrap -mx-6">
                <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
                  <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                    <div className="p-3 rounded-full bg-indigo-600 bg-opacity-75">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <div className="mx-5">
                      <h4 className="text-2xl font-semibold text-gray-700">1</h4>
                      <div className="text-gray-500">Active Customers</div>
                    </div>
                  </div>
                </div>
                <div className="w-full px-6 sm:w-1/2 xl:w-1/3 mt-4 sm:mt-0">
                  <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                    <div className="p-3 rounded-full bg-green-600 bg-opacity-75">
                      <FileText className="h-8 w-8 text-white" />
                    </div>
                    <div className="mx-5">
                      <h4 className="text-2xl font-semibold text-gray-700">1</h4>
                      <div className="text-gray-500">Active Policies</div>
                    </div>
                  </div>
                </div>
                <div className="w-full px-6 sm:w-1/2 xl:w-1/3 mt-4 xl:mt-0">
                  <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                    <div className="p-3 rounded-full bg-pink-600 bg-opacity-75">
                      <IndianRupeeIcon className="h-8 w-8 text-white" />
                    </div>
                    <div className="mx-5">
                      <h4 className="text-2xl font-semibold text-gray-700">₹23,694</h4>
                      <div className="text-gray-500">Total Premium</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex flex-col mt-8">
                <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                  <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                    <table className="min-w-full">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Action
                          </th>
                          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Policy
                          </th>
                          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Customer
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {recentActivities.map((activity) => (
                          <tr key={activity.id}>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <div className="text-sm leading-5 text-gray-900">{activity.action}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <div className="text-sm leading-5 text-gray-900">{activity.policy}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <div className="text-sm leading-5 text-gray-900">{activity.customer}</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="p-4">
                      <button 
                        onClick={() => navigate('/plans')} 
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
                      >
                        View Plan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
