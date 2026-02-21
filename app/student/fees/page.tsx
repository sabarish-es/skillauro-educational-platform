'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PaymentModal } from '@/components/payment-modal';
import { DollarSign, CreditCard } from 'lucide-react';

const feeDetails = [
  {
    id: 1,
    course: 'Web Development Mastery',
    totalFees: 15000,
    paidAmount: 15000,
    pendingAmount: 0,
    status: 'Paid',
    dueDate: '2024-02-15',
  },
  {
    id: 2,
    course: 'React Advanced',
    totalFees: 12000,
    paidAmount: 8000,
    pendingAmount: 4000,
    status: 'Partial',
    dueDate: '2024-02-20',
  },
  {
    id: 3,
    course: 'Node.js Backend',
    totalFees: 14000,
    paidAmount: 0,
    pendingAmount: 14000,
    status: 'Pending',
    dueDate: '2024-02-28',
  },
];

export default function StudentFeesPage() {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedFee, setSelectedFee] = useState<typeof feeDetails[0] | null>(null);

  const totalFees = 41000;
  const totalPaid = 23000;
  const totalPending = 18000;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Partial':
        return 'bg-yellow-100 text-yellow-800';
      case 'Pending':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Fees Management</h1>
        <p className="text-gray-600">View your fees details and make payments</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Fees</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  ₹{totalFees.toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Paid Amount</p>
                <p className="text-2xl font-bold text-green-600 mt-2">
                  ₹{totalPaid.toLocaleString()}
                </p>
              </div>
              <CreditCard className="h-8 w-8 text-green-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Pending Amount</p>
                <p className="text-2xl font-bold text-red-600 mt-2">
                  ₹{totalPending.toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-red-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fees Table */}
      <Card>
        <CardHeader>
          <CardTitle>Fees Breakdown by Course</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-b">
                <TableHead>Course Name</TableHead>
                <TableHead>Total Fees</TableHead>
                <TableHead>Paid Amount</TableHead>
                <TableHead>Pending Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feeDetails.map((fee) => (
                <TableRow key={fee.id} className="border-b">
                  <TableCell className="font-medium">{fee.course}</TableCell>
                  <TableCell className="font-semibold">₹{fee.totalFees.toLocaleString()}</TableCell>
                  <TableCell className="text-green-600 font-semibold">₹{fee.paidAmount.toLocaleString()}</TableCell>
                  <TableCell className="text-red-600 font-semibold">₹{fee.pendingAmount.toLocaleString()}</TableCell>
                  <TableCell className="text-sm">{fee.dueDate}</TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-semibold ${getStatusColor(
                        fee.status
                      )}`}
                    >
                      {fee.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {fee.status !== 'Paid' && (
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => {
                          setSelectedFee(fee);
                          setShowPaymentForm(true);
                        }}
                      >
                        Pay Now
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payment Modal */}
      {showPaymentForm && selectedFee && (
        <PaymentModal
          course={selectedFee.course}
          amount={selectedFee.pendingAmount}
          feeId={selectedFee.id}
          onClose={() => {
            setShowPaymentForm(false);
            setSelectedFee(null);
          }}
          onSuccess={() => {
            console.log('Payment successful');
            // Update UI or fetch updated fee status here
          }}
        />
      )}
    </div>
  );
}
