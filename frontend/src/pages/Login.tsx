import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, API_URL } from "@/contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Get the intended destination or default to /calendar
  const from = location.state?.from?.pathname || "/calendar";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Fetch user details from /me endpoint
      const meResponse = await fetch(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${data.session.access_token}` },
      });
      const meData = await meResponse.json();

      console.log("Login response:", data);
      console.log("/me response:", meData);
      console.log("User name from DB:", meData.user?.name);

      if (!meResponse.ok) {
        console.error("Failed to fetch user details:", meData.error);
        throw new Error(meData.error || "Failed to fetch user details");
      }

      // Login with user data
      login(
        {
          id: data.user.id,
          email: data.user.email,
          name: meData.user?.name || data.user.email.split("@")[0],
        },
        data.session.access_token,
      );

      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <span className="text-2xl font-black tracking-tighter text-black">the decay</span>
          </Link>
          <h1 className="font-airone text-3xl font-bold text-white mb-2 lowercase">
            welcome back
          </h1>
          <p className="text-zinc-400">sign in to your account to continue</p>
        </div>

        {/* Login Card */}
        <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white font-bold">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="rounded-xl border-zinc-700 bg-black text-white placeholder:text-zinc-600 focus:border-white focus:ring-white"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-white font-bold">
                  Password
                </Label>
                <a
                  href="#"
                  className="text-xs text-zinc-400 hover:text-white font-medium"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="pr-10 rounded-xl border-zinc-700 bg-black text-white placeholder:text-zinc-600 focus:border-white focus:ring-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-black hover:bg-zinc-200 rounded-full font-bold h-12 disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>

        <p className="text-center mt-6 text-sm text-zinc-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-white hover:underline font-bold">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
