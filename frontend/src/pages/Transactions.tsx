import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Download,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const transactions = [
  {
    id: 1,
    name: "Netflix Subscription",
    category: "Entertainment",
    amount: -15.99,
    date: "Feb 3, 2026",
    status: "completed",
    icon: "🎬",
  },
  {
    id: 2,
    name: "Salary Deposit",
    category: "Income",
    amount: 5420.0,
    date: "Feb 3, 2026",
    status: "completed",
    icon: "💰",
  },
  {
    id: 3,
    name: "Grocery Store",
    category: "Shopping",
    amount: -128.45,
    date: "Feb 2, 2026",
    status: "completed",
    icon: "🛒",
  },
  {
    id: 4,
    name: "Uber Ride",
    category: "Transport",
    amount: -24.5,
    date: "Feb 2, 2026",
    status: "completed",
    icon: "🚗",
  },
  {
    id: 5,
    name: "Investment Return",
    category: "Investment",
    amount: 892.3,
    date: "Feb 1, 2026",
    status: "completed",
    icon: "📈",
  },
  {
    id: 6,
    name: "Electric Bill",
    category: "Utilities",
    amount: -156.0,
    date: "Feb 1, 2026",
    status: "pending",
    icon: "⚡",
  },
  {
    id: 7,
    name: "Gym Membership",
    category: "Health",
    amount: -49.99,
    date: "Jan 31, 2026",
    status: "completed",
    icon: "🏋️",
  },
  {
    id: 8,
    name: "Freelance Payment",
    category: "Income",
    amount: 1250.0,
    date: "Jan 30, 2026",
    status: "completed",
    icon: "💼",
  },
  {
    id: 9,
    name: "Restaurant",
    category: "Dining",
    amount: -85.6,
    date: "Jan 30, 2026",
    status: "completed",
    icon: "🍽️",
  },
  {
    id: 10,
    name: "Spotify Premium",
    category: "Entertainment",
    amount: -9.99,
    date: "Jan 29, 2026",
    status: "failed",
    icon: "🎵",
  },
];

const filters = ["All", "Income", "Expense", "Pending"];

const Transactions = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch = tx.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === "All" ||
      (activeFilter === "Income" && tx.amount > 0) ||
      (activeFilter === "Expense" && tx.amount < 0) ||
      (activeFilter === "Pending" && tx.status === "pending");
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h2 className="text-2xl font-bold text-foreground">Transactions</h2>
          <p className="text-muted-foreground">Track and manage all your transactions</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </motion.div>

      {/* Filters & Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col md:flex-row gap-4"
      >
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-secondary/50 border-0 focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-xl transition-colors",
                activeFilter === filter
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/50 text-muted-foreground hover:text-foreground"
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* More filters button */}
        <Button variant="outline" className="gap-2 border-border/50">
          <Filter className="h-4 w-4" />
          More Filters
          <ChevronDown className="h-4 w-4" />
        </Button>
      </motion.div>

      {/* Transactions Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass-card overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                  Transaction
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                  Category
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                  Date
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                  Status
                </th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredTransactions.map((tx, index) => (
                <motion.tr
                  key={tx.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.03 }}
                  className="hover:bg-secondary/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-lg">
                        {tx.icon}
                      </div>
                      <span className="font-medium text-foreground">{tx.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted-foreground">{tx.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted-foreground">{tx.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
                        tx.status === "completed" && "badge-success",
                        tx.status === "pending" && "badge-pending",
                        tx.status === "failed" && "badge-failed"
                      )}
                    >
                      {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {tx.amount > 0 ? (
                        <ArrowUpRight className="h-4 w-4 text-success" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span
                        className={cn(
                          "font-medium",
                          tx.amount > 0 ? "text-success" : "text-foreground"
                        )}
                      >
                        {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
                      </span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing {filteredTransactions.length} of {transactions.length} transactions
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-border/50">
              Previous
            </Button>
            <Button variant="outline" size="sm" className="border-border/50">
              Next
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Transactions;
