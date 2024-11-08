'use client'

import { useState, useEffect } from 'react'
import { Check, X, Clock, Upload } from 'lucide-react'

const mockApplicationHistory = [
  { id: 1, date: '2023-06-01', status: 'submitted', message: 'Application submitted successfully' },
  { id: 2, date: '2023-06-02', status: 'processing', message: 'Application is being reviewed' },
  { id: 3, date: '2023-06-03', status: 'approved', message: 'Application approved' },
]

export default function ApplicationStatus() {
  const [applicationStatus, setApplicationStatus] = useState('processing')
  const [applicationHistory, setApplicationHistory] = useState([])
  const [documents, setDocuments] = useState({
    idProof: null,
    incomeProof: null,
    addressProof: null,
  })

  useEffect(() => {
    // Simulate fetching application status and history
    setTimeout(() => {
      setApplicationStatus('approved')
      setApplicationHistory(mockApplicationHistory)
    }, 1500)
  }, [])

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <Check className="w-6 h-6 text-green-500" />
      case 'rejected':
        return <X className="w-6 h-6 text-red-500" />
      default:
        return <Clock className="w-6 h-6 text-yellow-500" />
    }
  }

  const handleDocumentChange = (e, type) => {
    setDocuments({ ...documents, [type]: e.target.files[0] })
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Application Status</h1>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="flex items-center justify-center mb-4">
            {getStatusIcon(applicationStatus)}
            <h2 className="text-2xl font-semibold ml-2 capitalize">{applicationStatus}</h2>
          </div>
          <p className="text-center text-gray-600">
            {applicationStatus === 'approved' 
              ? 'Congratulations! Your insurance application has been approved.' 
              : applicationStatus === 'rejected'
              ? 'We\'re sorry, but your insurance application has been rejected.'
              : 'Your application is currently being processed. We\'ll update you soon.'}
          </p>
        </div>

        {/* Document Upload Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Upload Required Documents</h2>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <label className="w-1/3 text-gray-700 font-medium">ID Proof</label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleDocumentChange(e, 'idProof')}
                className="flex-1"
              />
              {documents.idProof && (
                <p className="text-sm text-green-600 ml-4">Uploaded: {documents.idProof.name}</p>
              )}
            </div>

            <div className="flex items-center">
              <label className="w-1/3 text-gray-700 font-medium">Income Proof</label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleDocumentChange(e, 'incomeProof')}
                className="flex-1"
              />
              {documents.incomeProof && (
                <p className="text-sm text-green-600 ml-4">Uploaded: {documents.incomeProof.name}</p>
              )}
            </div>

            <div className="flex items-center">
              <label className="w-1/3 text-gray-700 font-medium">Address Proof</label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleDocumentChange(e, 'addressProof')}
                className="flex-1"
              />
              {documents.addressProof && (
                <p className="text-sm text-green-600 ml-4">Uploaded: {documents.addressProof.name}</p>
              )}
            </div>
          </div>
        </div>

        {/* Application History */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Application History</h2>
          <ul className="space-y-4">
            {applicationHistory.map((event) => (
              <li key={event.id} className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  {getStatusIcon(event.status)}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{event.message}</p>
                  <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
