import { useLocation , Link } from "react-router-dom";
import { useState } from "react";

const PAGE_SIZE = 10;

const Result = () => {
  const location = useLocation();
  const results = location.state?.results || [];
  const [page, setPage] = useState(0);

   // Calculate stats
  const totalWords = results.length;
  const correctAnswers = results.filter(r => r.isCorrect).length;
  const wrongAnswers = totalWords - correctAnswers;
  const score = totalWords > 0 ? Math.round((correctAnswers / totalWords) * 100) : 0;

  // Pagination logic
  const pagedRows = results.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const totalPages = Math.ceil(results.length / PAGE_SIZE);
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm">
        {/* Report Card Summary */}
      <div className="mb-6 p-4 rounded bg-emerald-50 border border-emerald-200">
        <h2 className="text-xl font-bold text-emerald-700 mb-2">Test Report</h2>
        <div className="flex flex-wrap gap-4 text-sm">
          <span className="font-medium text-gray-700">Total Words: <span className="font-bold">{totalWords}</span></span>
          <span className="font-medium text-green-700">Correct: <span className="font-bold">{correctAnswers}</span></span>
          <span className="font-medium text-red-700">Wrong: <span className="font-bold">{wrongAnswers}</span></span>
          <span className="font-medium text-blue-700">Score: <span className="font-bold">{score}%</span></span>
        </div>
      </div>
      <div className="space-y-6">
        {/* Header Row */}
        <div className="flex items-center pb-2 border-b border-gray-300 font-semibold text-gray-800 bg-gray-50 rounded">
          <span className="w-1/3 text-center">Word</span>
          <span className="w-1/3 text-center">Your Answer</span>
          <span className="w-1/3 text-center">Correct Answer</span>
          <span className="w-1/6 text-center">Result</span>
        </div>
        {/* Data Rows */}
        {pagedRows.map((row, index) => (
          <div
            key={row.id}
            className={`flex items-center pb-2 pl-5 ${
              index !== pagedRows.length - 1 ? "border-b border-gray-100" : ""
            }`}
          >
            <span className="w-1/3 text-sm font-medium text-gray-700">
              {row.label}
            </span>
            <span className="w-1/3 text-sm font-medium text-gray-500">
              {row.value}
            </span>
            <span className="w-1/3 text-sm font-medium text-green-700">
              {row.answer}
            </span>
            {(row.isCorrect)?
            <span className="w-1/6 text-sm font-medium text-gray-700">
              <img src="/icons/check.png" alt="correct" width={20} height={20}/>
            </span>:
            <span className="w-1/6 text-sm font-medium text-gray-700">
              <img src="/icons/cross.png" alt="wrong" width={18} height={18}/>
            </span>
            }
          </div>
        ))}
        <div className="flex justify-between items-center mt-6">
          <button
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            className={`px-4 py-2 rounded font-semibold transition-colors ${
              page === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
            }`}
          >
            Previous
          </button>
          {page < totalPages - 1 ? (
            <button
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 bg-emerald-600 text-white font-semibold rounded-md shadow hover:bg-emerald-700 transition-colors"
            >
              Next
            </button>
          ) : (
            <Link to="/test">
            <button
              className="px-4 py-2 mx-2 bg-emerald-600 text-white font-semibold rounded-md shadow hover:bg-emerald-700 transition-colors"
            >
              Test Again
            </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Result;
