'use client';

import { Card } from '@/components/ui/card';
import { Search, Download, Eye, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';

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

interface PaymentForm {
  studentId: string;
  amount: string;
  paymentMethod: string;
  remarks: string;
}

export default function FeesPage() {
  const [fees, setFees] = useState<FeeRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [paymentForm, setPaymentForm] = useState<PaymentForm>({
    studentId: '',
    amount: '',
    paymentMethod: 'manual',
    remarks: '',
  });
  const [submitting, setSubmitting] = useState(false);

  // Fetch fees data
  useEffect(() => {
    const fetchFees = async () => {
      try {
        const response = await fetch('/api/admin/fees/list');
        if (response.ok) {
          const data = await response.json();
          setFees(data.fees || []);
        }
      } catch (error) {
        console.error('[v0] Error fetching fees:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFees();
  }, []);

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentForm.studentId || !paymentForm.amount) return;

    setSubmitting(true);
    try {
      const response = await fetch('/api/admin/fees/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: paymentForm.studentId,
          amountPaid: parseInt(paymentForm.amount),
          paymentMethod: paymentForm.paymentMethod,
          remarks: paymentForm.remarks,
        }),
      });

      if (response.ok) {
        // Refresh fees data
        const listResponse = await fetch('/api/admin/fees/list');
        if (listResponse.ok) {
          const data = await listResponse.json();
          setFees(data.fees || []);
        }
        setShowPaymentForm(false);
        setPaymentForm({ studentId: '', amount: '', paymentMethod: 'manual', remarks: '' });
      }
    } catch (error) {
      console.error('[v0] Payment error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleExport = async () => {
    try {
      const response = await fetch('/api/admin/fees/export');
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `fees-report-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('[v0] Export error:', error);
    }
  };

  const filteredFees = fees.filter(
    (f) =>
      f.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.enrollmentNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalFeesCollected = fees.reduce((sum, f) => sum + f.amountPaid, 0);
  const totalDue = fees.reduce((sum, f) => sum + f.amountDue, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-600">Loading fees data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Fees Management</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setShowPaymentForm(!showPaymentForm)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
          >
            <Plus className="h-4 w-4" />
            Record Payment
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
          >
            <Download className="h-4 w-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Payment Form */}
      {showPaymentForm && (
        <Card className="p-6 bg-blue-50 border-2 border-blue-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Record Payment</h3>
          <form onSubmit={handlePaymentSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student</label>
              <select
                value={paymentForm.studentId}
                onChange={(e) => setPaymentForm({ ...paymentForm, studentId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                required
              >
                <option value="">Select Student...</option>
                {fees.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.studentName} ({f.enrollmentNumber})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
              <input
                type="number"
                min="0"
                value={paymentForm.amount}
                onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Method</label>
              <select
                value={paymentForm.paymentMethod}
                onChange={(e) => setPaymentForm({ ...paymentForm, paymentMethod: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="manual">Manual</option>
                <option value="online">Online</option>
                <option value="cheque">Cheque</option>
              </select>
            </div>
            <div className="flex gap-2 items-end">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50"
              >
                {submitting ? 'Recording...' : 'Record'}
              </button>
              <button
                type="button"
                onClick={() => setShowPaymentForm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </Card>
      )}

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
