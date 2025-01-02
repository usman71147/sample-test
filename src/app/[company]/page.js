"use client";

import { useState, useEffect } from "react";
import Image from "next/image"; // Import Next.js Image component
import { sampleOrders } from "../../utils/sampleOrders";

import darazLogo from "../../../public/logos/daraz.png";
import amazonLogo from "../../../public/logos/amazon.png";
import foodpandaLogo from "../../../public/logos/foodpanda.png";

const OrdersTable = ({ params }) => {
  const [company, setCompany] = useState("");
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [logo, setLogo] = useState(null);

  const ordersPerPage = 10;

  useEffect(() => {
    // Unwrap params asynchronously
    (async () => {
      const unwrappedParams = await params;
      const companyName = unwrappedParams?.company || "default";
      setCompany(companyName);

      const companyOrders = sampleOrders[companyName] || [];
      setOrders(companyOrders);

      // Set the logo based on the company
      const logoMap = {
        daraz: darazLogo,
        amazon: amazonLogo,
        foodpanda: foodpandaLogo,
      };

      setLogo(logoMap[companyName] || null);
    })();
  }, [params]);

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const sortedOrders = [...orders].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const paginatedOrders = sortedOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center flex-col items-center py-8">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-md p-4">
        {/* Header with Logo */}
        <div className="flex justify-between items-center mb-6">
          {logo && (
            <Image
              src={logo}
              alt={`${company} Logo`}
              className="h-16 w-auto object-contain mr-4"
              height={64}
              width={128}
            />
          )}
          <h1 className="text-2xl font-bold text-gray-700">
            {company.charAt(0).toUpperCase() + company.slice(1)} Orders Table
          </h1>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  onClick={() => handleSort("orderId")}
                  className="px-4 py-2 text-left cursor-pointer text-gray-700 font-medium hover:text-blue-600"
                >
                  Order ID
                </th>
                <th
                  onClick={() => handleSort("customerName")}
                  className="px-4 py-2 text-left cursor-pointer text-gray-700 font-medium hover:text-blue-600"
                >
                  Customer Name
                </th>
                <th
                  onClick={() => handleSort("amount")}
                  className="px-4 py-2 text-left cursor-pointer text-gray-700 font-medium hover:text-blue-600"
                >
                  Amount
                </th>
                <th
                  onClick={() => handleSort("status")}
                  className="px-4 py-2 text-left cursor-pointer text-gray-700 font-medium hover:text-blue-600"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order) => (
                <tr
                  key={order.orderId}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-2 text-black">{order.orderId}</td>
                  <td className="px-4 py-2 text-black">{order.customerName}</td>
                  <td className="px-4 py-2 text-black">{order.amount}</td>
                  <td
                    className={`px-4 py-2 ${
                      order.status === "Delivered"
                        ? "text-green-600"
                        : order.status === "Cancelled"
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;
