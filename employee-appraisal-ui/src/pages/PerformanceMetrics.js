import axios from "axios";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Performance = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPerformanceMetrics();
  }, []);

  const fetchPerformanceMetrics = () => {
    axios.get("http://localhost:8081/performance/bell-curve")
      .then((response) => {
        console.log("Performance Metrics:", response.data);
        setMetrics(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching performance metrics:", error);
        setLoading(false);
      });
  };

  if (loading) {
    return <div className="text-center text-lg font-semibold">Loading Performance Metrics...</div>;
  }

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">📊 Performance Metrics</h2>

      {/* Total Employees */}
      <div className="mb-5 p-4 bg-blue-200 text-blue-900 rounded-lg text-lg">
        <strong>Total Employees:</strong> {metrics.totalEmployees}
      </div>

      {/* Performance Chart */}
      <div className="mb-5 bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-3">Performance Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={formatChartData(metrics)}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="actual" fill="#4CAF50" name="Actual Percentage" />
            <Bar dataKey="standard" fill="#FF9800" name="Standard Percentage" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Suggested Adjustments */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-3">📌 Suggested Adjustments</h3>
        {Object.keys(metrics.suggestedAdjustments).length === 0 ? (
          <p className="text-gray-500">No adjustments needed.</p>
        ) : (
          <ul className="list-disc list-inside">
            {Object.entries(metrics.suggestedAdjustments).map(([employee, newRating]) => (
              <li key={employee} className="text-gray-700">
                {employee} → <strong className="text-blue-600">{newRating}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

// Helper function for chart data
const formatChartData = (metrics) => {
  return Object.keys(metrics.actualPercentages).map((category) => ({
    category,
    actual: metrics.actualPercentages[category],
    standard: metrics.standardPercentages[category],
  }));
};

export default Performance;
