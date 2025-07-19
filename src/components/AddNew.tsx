import toast from "react-hot-toast";
import { FaHome } from "react-icons/fa";
import Button from "./Button";

const AddNew = () => {
  // Add explicit type for event
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const englishInput = form.elements.namedItem("field1") as HTMLInputElement;
    const banglaInput = form.elements.namedItem("field2") as HTMLInputElement;

    const data = {
      english: englishInput.value,
      bangla: banglaInput.value,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/add-new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
        form.reset();
      } else {
        toast.error("Failed to submit.Try again.");
        form.reset();
      }
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label
            htmlFor="field1"
            className="block text-sm font-medium text-gray-700"
          >
            English Word
          </label>
          <input
            type="text"
            id="field1"
            name="field1"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
            placeholder="Enter the english word"
            required
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="field2"
            className="block text-sm font-medium text-gray-700"
          >
            Bangla Word
          </label>
          <input
            type="text"
            id="field2"
            name="field2"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
            placeholder="Enter the bangla word"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-emerald-600 text-white font-medium rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
        >
          Submit
        </button>
        <div className="px-2">
          <Button
            item={{ link: "/", icon: <FaHome />, label: "Go Back to Home" }}
          />
        </div>
      </form>
    </div>
  );
};

export default AddNew;
