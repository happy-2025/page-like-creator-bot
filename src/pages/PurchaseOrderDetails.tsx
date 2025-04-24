
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronRight } from "lucide-react";
import { useParams, Link } from 'react-router-dom';

const PurchaseOrderDetails = () => {
  const { poNumber } = useParams();

  // Mocked data based on PO number
  const orderDetails = {
    status: { modern: true, active: true },
    lastUpdated: '04-11-2025',
    department: '087 - GAMES/DIECAST/ACTION FIGURES',
    location: '551 - DC',
    vendor: '1000698 - TMP TOYS CO',
    approvedDate: '03-20-2025',
    shipmentDate: '03-27-2025',
    shipmentType: 'Collect',
    distributionType: 'Post Receipt Distribution',
    items: [
      { tcin: '89970422', dpci: '087-26-9587', description: 'MCFARLANE 1:6 POSED FIGURE', department: '087', class: '26', item: '9587' },
      { tcin: '89970575', dpci: '087-26-9140', description: 'MCFARLANE 7" DC FIGURE', department: '087', class: '26', item: '9140' },
      { tcin: '89970579', dpci: '087-26-3793', description: 'MCFARLANE 7" DC SUPERSTAR FIGURE', department: '087', class: '26', item: '3793' },
      { tcin: '93859247', dpci: '087-26-9270', description: 'DC Comics Action Figures', department: '087', class: '26', item: '9270' },
    ]
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link to="/" className="hover:text-white">AP Match</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/" className="hover:text-white">Purchase Orders</Link>
          <ChevronRight className="h-4 w-4" />
          <span>PO-{poNumber}</span>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold mb-2">PO Number - {poNumber}</h1>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">MODERN</Badge>
              <Badge variant="secondary" className="bg-green-500/20 text-green-300">ACTIVE</Badge>
            </div>
            <p className="text-sm text-gray-400 mt-2">Last updated by SYSTEM on {orderDetails.lastUpdated}</p>
          </div>
          <button className="px-4 py-2 bg-gray-800 rounded-md text-sm hover:bg-gray-700">
            Actions
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-900 p-6 rounded-lg">
            <div className="grid grid-cols-2 gap-y-6">
              <div>
                <p className="text-sm text-gray-400 mb-1">Department</p>
                <p>{orderDetails.department}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Location</p>
                <p>{orderDetails.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Vendor</p>
                <p>{orderDetails.vendor}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Approved Date</p>
                <p>{orderDetails.approvedDate}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg">
            <div className="grid grid-cols-2 gap-y-6">
              <div>
                <p className="text-sm text-gray-400 mb-1">Shipment Date</p>
                <p>{orderDetails.shipmentDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Shipment Type</p>
                <p>{orderDetails.shipmentType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Distribution Type</p>
                <p>{orderDetails.distributionType}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-gray-800">
                <TableHead className="text-white">TCIN</TableHead>
                <TableHead className="text-white">DPCI</TableHead>
                <TableHead className="text-white">Item Description</TableHead>
                <TableHead className="text-white">Department</TableHead>
                <TableHead className="text-white">Class</TableHead>
                <TableHead className="text-white">Item</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderDetails.items.map((item, index) => (
                <TableRow key={index} className="hover:bg-gray-800">
                  <TableCell className="text-white">{item.tcin}</TableCell>
                  <TableCell className="text-white">{item.dpci}</TableCell>
                  <TableCell className="text-white">{item.description}</TableCell>
                  <TableCell className="text-white">{item.department}</TableCell>
                  <TableCell className="text-white">{item.class}</TableCell>
                  <TableCell className="text-white">{item.item}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrderDetails;
