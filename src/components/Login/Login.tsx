import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(name, email, password);
  };

  return (
    <div className="w-full flex justify-center items-center mt-28">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 w-[400px] border-2 border-gray-300 rounded-md p-10 shadow-md"
      >
        <fieldset className="w-full flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input
            type="name"
            placeholder="name"
            className="w-full border-2 border-gray-300 rounded-md p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </fieldset>
        <fieldset className="w-full flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="w-full border-2 border-gray-300 rounded-md p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>
        <fieldset className="w-full flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="w-full border-2 border-gray-300 rounded-md p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>
        <fieldset className="w-full ">
          <button
            className="w-full bg-violet-500 text-white p-2 rounded-md font-semibold mt-2"
            type="submit"
          >
            Login
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default Login;
