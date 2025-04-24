import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronLeft, ChevronRight, Download, Filter, X } from "lucide-react";
import { Link } from 'react-router-dom';

interface PurchaseOrder {
  totalCost: number;
  poNumber: string;
  department: string;
  location: string;
  vendor: string;
}

const mockData: PurchaseOrder[] = [
  { totalCost: 13384.80, poNumber: '1320160', department: '261 - BREAD/BAKING', location: '3892 - DC', vendor: '2568359 - HERSHEY FOODS CORPORATION' },
  { totalCost: 10707.84, poNumber: '1320160', department: '261 - BREAD/BAKING', location: '3895 - DC', vendor: '2568359 - HERSHEY FOODS CORPORATION' },
  { totalCost: 0.00, poNumber: '13201', department: '096 - WOMENS FOOTWEAR', location: '559 - DC', vendor: '1214031 - CONVERSE INC' },
  { totalCost: 0.00, poNumber: '13201', department: '096 - WOMENS FOOTWEAR', location: '589 - DC', vendor: '1214031 - CONVERSE INC' },
  { totalCost: 0.00, poNumber: '13201', department: '096 - WOMENS FOOTWEAR', location: '590 - DC', vendor: '1214031 - CONVERSE INC' },
];

export const PurchaseOrders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filters, setFilters] = useState({ poNumber: '', department: '', location: '', vendor: '', approvedDate: '' });
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    if (value && !activeFilters.includes(key)) {
      setActiveFilters(prev => [...prev, key]);
    } else if (!value && activeFilters.includes(key)) {
      setActiveFilters(prev => prev.filter(filter => filter !== key));
    }
  };

  const clearFilter = (filter: string) => {
    setFilters(prev => ({ ...prev, [filter]: '' }));
    setActiveFilters(prev => prev.filter(f => f !== filter));
  };

  const clearAllFilters = () => {
    setFilters({ poNumber: '', department: '', location: '', vendor: '', approvedDate: '' });
    setActiveFilters([]);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Purchase Orders</h1>
        
        <div className="mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Input
              placeholder="PO Number"
              value={filters.poNumber}
              onChange={(e) => handleFilterChange('poNumber', e.target.value)}
              className="bg-gray-900 border-gray-800"
            />
            <Input
              placeholder="Department"
              value={filters.department}
              onChange={(e) => handleFilterChange('department', e.target.value)}
              className="bg-gray-900 border-gray-800"
            />
            <Input
              placeholder="Location"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="bg-gray-900 border-gray-800"
            />
            <Input
              placeholder="Vendor"
              value={filters.vendor}
              onChange={(e) => handleFilterChange('vendor', e.target.value)}
              className="bg-gray-900 border-gray-800"
            />
            <Input
              type="date"
              placeholder="Approved Date"
              value={filters.approvedDate}
              onChange={(e) => handleFilterChange('approvedDate', e.target.value)}
              className="bg-gray-900 border-gray-800"
            />
          </div>

          {activeFilters.length > 0 && (
            <div className="flex items-center gap-2">
              {activeFilters.map(filter => (
                <div key={filter} className="flex items-center bg-gray-800 px-3 py-1 rounded-full text-sm">
                  <span className="mr-2">{filters[filter as keyof typeof filters]}</span>
                  <button onClick={() => clearFilter(filter)} className="text-gray-400 hover:text-white">
                    <X size={14} />
                  </button>
                </div>
              ))}
              <button onClick={clearAllFilters} className="text-blue-400 text-sm hover:text-blue-300">
                Clear all
              </button>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" className="bg-gray-900 border-gray-800">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
            <Button variant="outline" className="bg-gray-900 border-gray-800">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-gray-800">
                <TableHead className="text-white">Total Cost</TableHead>
                <TableHead className="text-white">PO Number</TableHead>
                <TableHead className="text-white">Department</TableHead>
                <TableHead className="text-white">Location</TableHead>
                <TableHead className="text-white">Vendor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.map((order, index) => (
                <TableRow key={index} className="hover:bg-gray-800">
                  <TableCell className="text-white">${order.totalCost.toFixed(2)}</TableCell>
                  <TableCell>
                    <Link to={`/po/${order.poNumber}`} className="text-blue-400 hover:text-blue-300">
                      {order.poNumber}
                    </Link>
                  </TableCell>
                  <TableCell className="text-white">{order.department}</TableCell>
                  <TableCell className="text-white">{order.location}</TableCell>
                  <TableCell className="text-white">{order.vendor}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
          <div>Showing 1-10 of 31 items</div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" className="bg-gray-900 border-gray-800" size="sm">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="bg-gray-900 border border-gray-800 rounded px-3 py-1">
                Page 1 of 4
              </div>
              <Button variant="outline" className="bg-gray-900 border-gray-800" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span>Items per page</span>
              <select 
                className="bg-gray-900 border border-gray-800 rounded px-2 py-1 text-white"
                value={itemsPerPage}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
