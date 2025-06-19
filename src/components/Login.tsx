import Button from "./Button";
import { FaHome } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const handleSubmit = async (event:any) => {
        event.preventDefault();
    
        const form = event.target;
    
        const data = {
          email: form.email.value,
          password: form.password.value,
        };
    
        try {
          const response = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
    
          const result = await response.json();
    
          if (response.ok) {
            localStorage.setItem("token",result.token);
            window.dispatchEvent(new Event('authChanged'));
            toast.success(result.message);
            form.reset();
            navigate('/');
          } else {
            toast.error(`${result.message}.Check credentials and Try again.`);
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
                htmlFor="emailId"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="text"
                id="emailId"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
    
            <div className="space-y-1">
              <label
                htmlFor="passId"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="passId"
                name="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                placeholder="Enter your password"
                required
              />
            </div>
    
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-emerald-600 text-white font-medium rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
            >
              Login
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

export default Login;