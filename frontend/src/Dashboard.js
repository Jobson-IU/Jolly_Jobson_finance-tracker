import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  Pie,
  Bar,
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function Dashboard() {

  // STATES
  const [transactions, setTransactions] =
    useState([]);

  const [formData, setFormData] =
    useState({
      amount: "",
      category: "",
      type: "expense",
    });

  const [activeSection, setActiveSection] =
    useState("dashboard");

  const token =
    localStorage.getItem("token");

  // FETCH TRANSACTIONS
  const fetchTransactions = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/transactions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTransactions(response.data);

    } catch (error) {

      console.log(
        error.response?.data ||
        error.message
      );

    }
  };

  // CREATE TRANSACTION
  const createTransaction = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/transactions",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFormData({
        amount: "",
        category: "",
        type: "expense",
      });

      fetchTransactions();

    } catch (error) {

      console.log(
        error.response?.data ||
        error.message
      );

    }
  };

  // LOAD DATA
  useEffect(() => {

    fetchTransactions();

    // eslint-disable-next-line
  }, []);

  // LOGOUT
  const logout = () => {

    localStorage.removeItem("token");

    window.location.href = "/";
  };

  // CALCULATIONS
  const income = transactions
    .filter(
      (t) => t.type === "income"
    )
    .reduce(
      (sum, t) =>
        sum + Number(t.amount),
      0
    );

  const expense = transactions
    .filter(
      (t) => t.type === "expense"
    )
    .reduce(
      (sum, t) =>
        sum + Number(t.amount),
      0
    );

  const balance =
    income - expense;

  // CATEGORY DATA
  const categoryData = {};

  transactions.forEach((t) => {

    if (t.type === "expense") {

      const category =
        t.category.toLowerCase();

      categoryData[category] =
        (categoryData[category] || 0) +
        Number(t.amount);

    }
  });

  // SAVINGS RATE
  const savingsRate =
    income > 0
      ? (
          ((income - expense) /
            income) *
          100
        ).toFixed(1)
      : 0;

  // TOP EXPENSE
  let highestCategory = "";
  let highestAmount = 0;

  Object.entries(categoryData).forEach(
    ([category, amount]) => {

      if (amount > highestAmount) {

        highestAmount = amount;

        highestCategory = category;
      }
    }
  );

  // FINANCIAL HEALTH
  let financialHealth =
    "Healthy ✅";

  if (expense > income) {

    financialHealth =
      "Overspending ❌";

  } else if (savingsRate < 20) {

    financialHealth =
      "Needs Improvement ⚠️";
  }

  // PIE DATA
  const pieData = {

    labels:
      Object.keys(categoryData),

    datasets: [
      {
        data:
          Object.values(categoryData),

        backgroundColor: [
          "#3B82F6",
          "#8B5CF6",
          "#EC4899",
          "#10B981",
          "#F59E0B",
          "#EF4444",
        ],
      },
    ],
  };

  // BAR DATA
  const barData = {

    labels: [
      "Income",
      "Expense",
    ],

    datasets: [
      {
        label:
          "Financial Overview",

        data: [
          income,
          expense,
        ],

        backgroundColor: [
          "#10B981",
          "#EF4444",
        ],
      },
    ],
  };

  return (

    <div className="min-h-screen bg-slate-950 text-white flex">

      {/* SIDEBAR */}
      <div className="w-64 bg-slate-900 p-6 hidden md:block">

        <h1 className="text-3xl font-bold mb-10 text-blue-400">
          FinTrack
        </h1>

        <ul className="space-y-4 text-lg">

          <li>

            <button
              onClick={() =>
                setActiveSection("dashboard")
              }
              className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                activeSection === "dashboard"
                  ? "bg-blue-500"
                  : "hover:bg-slate-800"
              }`}
            >
              Dashboard
            </button>

          </li>

          <li>

            <button
              onClick={() =>
                setActiveSection("analytics")
              }
              className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                activeSection === "analytics"
                  ? "bg-purple-500"
                  : "hover:bg-slate-800"
              }`}
            >
              Analytics
            </button>

          </li>

          <li>

            <button
              onClick={() =>
                setActiveSection("reports")
              }
              className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                activeSection === "reports"
                  ? "bg-pink-500"
                  : "hover:bg-slate-800"
              }`}
            >
              Reports
            </button>

          </li>

        </ul>

        <button
          onClick={logout}
          className="mt-10 bg-red-500 px-4 py-2 rounded-xl hover:bg-red-600"
        >
          Logout
        </button>

      </div>

      {/* MAIN */}
      <div className="flex-1 p-8 overflow-y-auto">

        <h1 className="text-5xl font-bold mb-2">
          Financial Dashboard
        </h1>

        <p className="text-gray-400 mb-10">
          Track your finances professionally
        </p>

        {/* DASHBOARD */}
        {activeSection ===
          "dashboard" && (

          <>

            {/* ADD TRANSACTION */}
            <div className="bg-slate-900 p-6 rounded-3xl mb-10">

              <h2 className="text-2xl font-bold mb-6">
                Add Transaction
              </h2>

              <form
                onSubmit={createTransaction}
                className="grid grid-cols-1 md:grid-cols-4 gap-4"
              >

                <input
                  type="number"
                  placeholder="Amount"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      amount: e.target.value,
                    })
                  }
                  className="bg-slate-800 p-4 rounded-xl"
                />

                <input
                  type="text"
                  placeholder="Category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value,
                    })
                  }
                  className="bg-slate-800 p-4 rounded-xl"
                />

                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value,
                    })
                  }
                  className="bg-slate-800 p-4 rounded-xl"
                >

                  <option value="income">
                    Income
                  </option>

                  <option value="expense">
                    Expense
                  </option>

                </select>

                <button
                  type="submit"
                  className="bg-blue-500 rounded-xl hover:bg-blue-600"
                >
                  Add
                </button>

              </form>

            </div>

            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

              <div className="bg-green-600 p-6 rounded-3xl">

                <h2>Total Income</h2>

                <p className="text-4xl font-bold mt-3">
                  €{income}
                </p>

              </div>

              <div className="bg-red-600 p-6 rounded-3xl">

                <h2>Total Expense</h2>

                <p className="text-4xl font-bold mt-3">
                  €{expense}
                </p>

              </div>

              <div className="bg-blue-600 p-6 rounded-3xl">

                <h2>Balance</h2>

                <p className="text-4xl font-bold mt-3">
                  €{balance}
                </p>

              </div>

              <div className="bg-purple-600 p-6 rounded-3xl">

                <h2>Savings Rate</h2>

                <p className="text-4xl font-bold mt-3">
                  {savingsRate}%
                </p>

              </div>

            </div>

            {/* EXTRA INSIGHTS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

              <div className="bg-slate-900 p-6 rounded-3xl">

                <h2 className="text-gray-400">
                  Total Transactions
                </h2>

                <p className="text-3xl font-bold text-blue-400 mt-2">
                  {transactions.length}
                </p>

              </div>

              <div className="bg-slate-900 p-6 rounded-3xl">

                <h2 className="text-gray-400">
                  Highest Expense
                </h2>

                <p className="text-2xl font-bold text-red-400 mt-2">
                  {highestCategory || "N/A"}
                </p>

                <p className="text-gray-400">
                  €{highestAmount}
                </p>

              </div>

              <div className="bg-slate-900 p-6 rounded-3xl">

                <h2 className="text-gray-400">
                  Financial Health
                </h2>

                <p className="text-2xl font-bold mt-2">
                  {financialHealth}
                </p>

              </div>

            </div>

            {/* TRANSACTIONS */}
            <div className="bg-slate-900 p-6 rounded-3xl">

              <h2 className="text-2xl font-bold mb-6">
                Recent Transactions
              </h2>

              {transactions.length === 0 ? (

                <p>
                  No transactions found.
                </p>

              ) : (

                <div className="space-y-4">

                  {transactions.map((t) => (

                    <div
                      key={t.id}
                      className="bg-slate-800 p-5 rounded-2xl flex justify-between"
                    >

                      <div>

                        <p className="font-bold text-lg">
                          {t.category}
                        </p>

                        <p className="text-gray-400">
                          {t.type}
                        </p>

                      </div>

                      <p
                        className={`font-bold text-xl ${
                          t.type === "income"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        €{t.amount}
                      </p>

                    </div>

                  ))}

                </div>

              )}

            </div>

          </>

        )}

        {/* ANALYTICS */}
        {activeSection ===
          "analytics" && (

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            <div className="bg-slate-900 p-6 rounded-3xl">

              <h2 className="text-2xl font-bold mb-6">
                Expense Breakdown
              </h2>

              {Object.keys(categoryData)
                .length > 0 ? (

                <Pie data={pieData} />

              ) : (

                <p>
                  No expense data available.
                </p>

              )}

            </div>

            <div className="bg-slate-900 p-6 rounded-3xl">

              <h2 className="text-2xl font-bold mb-6">
                Income vs Expense
              </h2>

              {transactions.length > 0 ? (

                <Bar data={barData} />

              ) : (

                <p>
                  No financial data available.
                </p>

              )}

            </div>

          </div>

        )}

        {/* REPORTS */}
        {activeSection ===
          "reports" && (

          <div className="space-y-8">

            {/* MAIN REPORT */}
            <div className="bg-slate-900 p-6 rounded-3xl">

              <h2 className="text-3xl font-bold mb-6">
                Monthly Financial Report
              </h2>

              <div className="space-y-4 text-lg">

                <p>
                  Total Income:
                  {" "}
                  €{income}
                </p>

                <p>
                  Total Expense:
                  {" "}
                  €{expense}
                </p>

                <p>
                  Savings:
                  {" "}
                  €{balance}
                </p>

                <p>
                  Savings Rate:
                  {" "}
                  {savingsRate}%
                </p>

                <p>
                  Total Transactions:
                  {" "}
                  {transactions.length}
                </p>

                <p>
                  Highest Spending Category:
                  {" "}
                  {highestCategory}
                  {" "}
                  (€{highestAmount})
                </p>

                <p>
                  Financial Status:
                  {" "}
                  {financialHealth}
                </p>

              </div>

            </div>

            {/* SMART RECOMMENDATION */}
            <div className="bg-slate-900 p-6 rounded-3xl">

              <h2 className="text-2xl font-bold mb-4">
                Smart Recommendation
              </h2>

              <p className="text-lg text-gray-300">

                {expense > income
                  ? "Your expenses are higher than your income. Reduce non-essential spending."
                  : highestAmount > income * 0.4
                  ? `Your ${highestCategory} expenses are very high. Consider optimizing this category.`
                  : "Your finances look healthy. Keep maintaining your current savings habits."}

              </p>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default Dashboard;