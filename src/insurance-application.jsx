'use client'

import { useState } from 'react'
import { Car, Bike, Heart, Upload } from 'lucide-react'
import axios from 'axios'

const insuranceTypes = [
  { id: 'life', name: 'Life Insurance', icon: Heart },
  { id: 'car', name: 'Car Insurance', icon: Car },
  { id: 'bike', name: 'Bike Insurance', icon: Bike },
]

const formFields = {
  life: ['Full Name', 'Date of Birth', 'Occupation', 'Annual Income'],
  car: ['Vehicle Model', 'Vehicle Year', 'Registration Number', 'Vehicle Value'],
  bike: ['Bike Model', 'Bike Year', 'Registration Number', 'Bike Value'],
}

// Replace with your Pinata API Key and Secret
const PINATA_API_KEY = 'bbbe5ea261a462b68c1a'
const PINATA_SECRET_API_KEY = 'b2645d4eacb1eca88b5827ebf36d2351e63954ae3ffa292a3f2992eaaea33b46'

export default function InsuranceApplication() {
  const [selectedType, setSelectedType] = useState(null)
  const [formData, setFormData] = useState({})
  const [documents, setDocuments] = useState([])
  const [walletAddress, setWalletAddress] = useState('')
  const [uploading, setUploading] = useState(false)

  const handleTypeSelect = (type) => {
    setSelectedType(type)
    setFormData({})
    setDocuments([])
    setWalletAddress('')
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleWalletAddressChange = (e) => {
    setWalletAddress(e.target.value)
  }

  const handleFileUpload = async (e) => {
    const files = e.target.files
    setUploading(true)

    try {
      const uploadedFiles = []

      for (let file of files) {
        const uploadFormData = new FormData()
        uploadFormData.append('file', file)
        
        // Pinata Metadata (optional)
        const metadata = JSON.stringify({
          name: file.name,
          keyvalues: {
            uploadedBy: 'Insurance Application'
          }
        })

        uploadFormData.append('pinataMetadata', metadata)

        // Pinata Options (optional)
        const options = JSON.stringify({
          cidVersion: 1,
        })
        uploadFormData.append('pinataOptions', options)

        // Uploading to Pinata
        const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', uploadFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            pinata_api_key: 'bbbe5ea261a462b68c1a',
            pinata_secret_api_key: 'b2645d4eacb1eca88b5827ebf36d2351e63954ae3ffa292a3f2992eaaea33b46',
          },
        })

        const fileUrl = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`
        uploadedFiles.push(fileUrl)
      }

      setDocuments(uploadedFiles)
      console.log('Files uploaded to Pinata:', uploadedFiles)
    } catch (error) {
      console.error('File upload to Pinata failed:', error)
      alert('File upload to Pinata failed.')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', {
      type: selectedType,
      ...formData,
      documents,
      walletAddress,
    })

    alert(`Files uploaded to IPFS and will be sent to wallet address: ${walletAddress}`)
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Apply for Insurance</h1>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Select Insurance Type</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {insuranceTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => handleTypeSelect(type.id)}
                className={`flex items-center justify-center p-4 rounded-lg transition-colors ${
                  selectedType === type.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <type.icon className="w-6 h-6 mr-2" />
                {type.name}
              </button>
            ))}
          </div>
        </div>

        {selectedType && (
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Enter Details</h2>
            {formFields[selectedType].map((field) => (
              <div key={field} className="mb-4">
                <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
                  {field}
                </label>
                <input
                  type="text"
                  id={field}
                  name={field}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            ))}

            <div className="mb-4">
              <label htmlFor="walletAddress" className="block text-sm font-medium text-gray-700 mb-1">
                Recipient Wallet Address
              </label>
              <input
                type="text"
                id="walletAddress"
                name="walletAddress"
                value={walletAddress}
                onChange={handleWalletAddressChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Documents
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleFileUpload}
                        multiple
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={uploading}
              >
                {uploading ? 'Uploading...' : 'Submit Application'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
