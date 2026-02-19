'use client';

import { Card } from '@/components/ui/card';
import { Search, Download, Eye } from 'lucide-react';
import { useState } from 'react';

interface FeeRecord {
  id: string;
  studentName: string;
  enrollmentNumber: string;
  totalFees: number;
  amountPaid: number;
  amountDue: number;
  status: 'Paid' | 'Partially Paid' | 'Unpaid';
  lastPaymentDate: string;
}

const initialFees: FeeRecord[] = [
  {
    id: '1',
    studentName: 'Arjun Singh',
    enrollmentNumber: 'STU001',
    totalFees: 150000,
    amountPaid: 150000,
    amountDue: 0,
    status: 'Paid',
    lastPaymentDate: '2024-01-15',
  },
  {
    id: '2',
    studentName: 'Anjali Sharma',
    enrollmentNumber: 'STU002',
    totalFees: 150000,
    amountPaid: 150000,
    amountDue: 0,
    status: 'Paid',
    lastPaymentDate: '2024-01-18',
  },
  {
    id: '3',
    studentName: 'Rahul Patel',
    enrollmentNumber: 'STU003',
    totalFees: 150000,
    amountPaid: 75000,
    amountDue: 75000,
    status: 'Partially Paid',
    lastPaymentDate: '2023-12-20',
  },
  {
    id: '4',
    studentName: 'Neha Verma',
    enrollmentNumber: 'STU004',
    totalFees: 150000,
    amountPaid: 150000,
    amountDue: 0,
    status: 'Paid',
    lastPaymentDate: '2024-01-10',
  },
  {
    id: '5',
    studentName: 'Priya Singh',
    enrollmentNumber: 'STU005',
    totalFees: 150000,
    amountPaid: 0,
    amountDue: 150000,
    status: 'Unpaid',
    lastPaymentDate: 'N/A',
  },
];

export default function FeesPage() {
  const [fees, setFees] = useState(initialFees);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFees = fees.filter(
    (f) =>
      f.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.enrollmentNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalFeesCollected = fees.reduce((sum, f) => sum + f.amountPaid, 0);
  const totalDue = fees.reduce((sum, f) => sum + f.amountDue, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Fees Management</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium">
          <Download className="h-4 w-4" />
          Export Report
        </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Total Students</p>
          <p className="text-3xl font-bold text-gray-900">{fees.length}</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100">
          <p className="text-sm text-gray-600 mb-2">Fees Collected</p>
          <p className="text-3xl font-bold text-green-700">₹{(totalFeesCollected / 100000).toFixed(1)}L</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100">
          <p className="text-sm text-gray-600 mb-2">Outstanding Amount</p>
          <p className="text-3xl font-bold text-red-700">₹{(totalDue / 100000).toFixed(1)}L</p>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by student name or enrollment number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-500"
          />
        </div>
      </Card>

      {/* Fees Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Student Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Enrollment #</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Total Fees</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount Paid</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount Due</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Last Payment</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredFees.map((feeRecord) => (
                <tr key={feeRecord.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{feeRecord.studentName}</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-gray-600">{feeRecord.enrollmentNumber}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">₹{feeRecord.totalFees.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm font-medium text-green-700">₹{feeRecord.amountPaid.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm font-medium text-red-700">₹{feeRecord.amountDue.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        feeRecord.status === 'Paid'
                          ? 'bg-green-100 text-green-800'
                          : feeRecord.status === 'Partially Paid'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {feeRecord.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{feeRecord.lastPaymentDate}</td>
                  <td className="px-6 py-4">
                    <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
                      <Eye className="h-4 w-4 text-blue-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredFees.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-gray-600">No fee records found matching your search.</p>
        </Card>
      )}
    </div>
  );
}
