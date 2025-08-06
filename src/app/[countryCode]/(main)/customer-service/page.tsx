import { Metadata } from "next"

import Twitter from "@modules/common/icons/twitter"
import Email from "@modules/common/icons/email"
import { getBaseURL } from "@lib/util/env"

export const metadata: Metadata = {
  title: "Customer Service | ChokerLab",
  description: "Get in touch with our customer service team via Twitter/X or email.",
}

export default function CustomerServicePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Customer Service
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            We're here to help! Get in touch with us through your preferred method.
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Twitter/X Contact */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
                <Twitter size="32" color="white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Follow us on X (Twitter)
              </h3>
              <p className="text-gray-600 mb-6 text-center">
                Stay updated with our latest products, announcements, and get quick responses to your questions.
              </p>
              <a
                href="https://twitter.com/chokerlab"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Twitter size="20" color="white" className="mr-2" />
                Follow @chokerlab
              </a>
            </div>
          </div>

          {/* Email Contact */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                <Email size="32" color="white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Email Support
              </h3>
              <p className="text-gray-600 mb-6 text-center">
                Send us a detailed message and we'll get back to you within 24 hours.
              </p>
              <a
                href="mailto:support@chokerlab.com"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Email size="20" color="white" className="mr-2" />
                support@chokerlab.com
              </a>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            What can we help you with?
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-left">
            <div className="space-y-2">
              <p className="text-gray-700">• Order status and tracking</p>
              <p className="text-gray-700">• Product information and sizing</p>
              <p className="text-gray-700">• Returns and exchanges</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-700">• Payment and billing issues</p>
              <p className="text-gray-700">• Custom design requests</p>
              <p className="text-gray-700">• General inquiries</p>
            </div>
          </div>
        </div>

        {/* Response Time */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            We typically respond within 24 hours during business days.
          </p>
        </div>
      </div>
    </div>
  )
} 