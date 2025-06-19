import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { FaHome } from "react-icons/fa";

const PAGE_SIZE = 5;

const Test = () => {
  const [LoggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const [step, setStep] = useState(1); // 1: ask for count, 2: show test
  const [wordCount, setWordCount] = useState("");
  const [allWords, setAllWords] = useState<
    { id: number; label: string; value: string; answer: string }[]
  >([]);
  const [page, setPage] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const updateAuthChange = () => setLoggedIn(!!localStorage.getItem("token"));
    window.addEventListener("authChanged", updateAuthChange);
    return () => window.removeEventListener("authChanged", updateAuthChange);
  }, []);

  // Handle submit for word count
  const handleWordCountSubmit = async (event: any) => {
    event.preventDefault();
    const count = parseInt(wordCount, 10);

    // Fetch words from backend
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/test?limit=${count}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      if (result.success) {
        // Prepare rows for test
        setAllWords(
          result.data.map((word, idx) => ({
            id: idx + 1,
            label: word.english,
            value: "",
            answer: word.bangla,
          }))
        );
        setStep(2);
        setPage(0);
      }
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };

  //Handle test count submit
  const handleTestSubmit = () => {
    //Evaluation
    const results = allWords.map((row) => ({
      ...row,
      isCorrect: row.value === row.answer,
    }));
    console.log(`test theke pathaisi ${results}`);
    //Passing the result to Result page
    navigate("/results", { state: { results } });
  };

  // Handle input change in test rows
  const handleChange = (id, value) => {
    setAllWords(
      allWords.map((row) => (row.id === id ? { ...row, value } : row))
    );
  };

  // Pagination logic
  const pagedRows = allWords.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const totalPages = Math.ceil(allWords.length / PAGE_SIZE);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="space-y-6">
        {!LoggedIn ? (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <h2 className="text-gray-500 text-xl font-medium mb-2">
              Please Login at first
            </h2>
            <p className="text-gray-400">
              You have to login at first to give test
            </p>
          </div>
        ) : step === 1 ? (
          <form
            onSubmit={handleWordCountSubmit}
            className="flex flex-col items-center gap-4"
          >
            <label
              htmlFor="wordCntSelect"
              className="text-gray-700 font-medium"
            >
              Enter number of words for the test:
            </label>
            <select
              value={wordCount}
              id="wordCntSelect"
              onChange={(e) => setWordCount(e.target.value)}
              className="w-36 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            >
              <option value="" disabled>
                Select count
              </option>
              {Array.from({ length: 46 }, (_, i) => i + 5).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="px-6 py-2 bg-emerald-600 text-white font-semibold rounded-md shadow hover:bg-emerald-700 transition-colors"
            >
              Start Test
            </button>
          </form>
        ) : (
          <>
            {pagedRows.map((row, index) => (
              <div
                key={row.id}
                className={`flex items-center pb-2 ${
                  index !== pagedRows.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                <span className="w-1/3 text-sm font-medium text-gray-700">
                  {row.label}
                </span>
                <div className="flex-1">
                  <input
                    type="text"
                    value={row.value}
                    onChange={(e) => handleChange(row.id, e.target.value)}
                    className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm bg-transparent"
                    placeholder={`Enter translation`}
                  />
                </div>
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
                <button
                  onClick={handleTestSubmit}
                  className="px-4 py-2 bg-emerald-600 text-white font-semibold rounded-md shadow hover:bg-emerald-700 transition-colors"
                >
                  Submit
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Test;
