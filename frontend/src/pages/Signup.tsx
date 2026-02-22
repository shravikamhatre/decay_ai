import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Check, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useAuth, API_URL } from "@/contexts/AuthContext";

const steps = [
  { id: 1, title: "Account" },
  { id: 2, title: "Profile" },
  { id: 3, title: "Content Focus" },
];

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    investmentGoal: "",
  });

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          accountType: "creator",
          categories: [formData.investmentGoal || "Brand Awareness"],
          formats: ["video", "image"],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Signup failed");
      }

      // Login after signup
      const loginResponse = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const loginData = await loginResponse.json();

      if (loginResponse.ok && loginData.session) {
        login(
          {
            id: loginData.user.id,
            email: loginData.user.email,
            name: `${formData.firstName} ${formData.lastName}`.trim(),
          },
          loginData.session.access_token
        );
      } else {
        // Still store user data locally even if auto-login fails
        login(
          {
            id: data.userId,
            email: formData.email,
            name: `${formData.firstName} ${formData.lastName}`.trim(),
          },
          "" // Empty token, user will need to login again
        );
      }

      navigate("/onboarding");
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
          <h1 className="font-airone text-3xl font-bold text-white mb-2 lowercase">join the decay</h1>
          <p className="text-zinc-400">start your creator journey today</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-all duration-300",
                  currentStep > step.id
                    ? "bg-waxy-lime text-black"
                    : currentStep === step.id
                      ? "bg-white text-black"
                      : "bg-zinc-800 text-zinc-500"
                )}
              >
                {currentStep > step.id ? <Check className="h-4 w-4" /> : step.id}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 w-12 mx-2 transition-all duration-300",
                    currentStep > step.id ? "bg-waxy-lime" : "bg-zinc-800"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Signup Card */}
        <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-5">
              {error}
            </div>
          )}

          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Step 1: Account */}
            {currentStep === 1 && (
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white font-bold">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    disabled={isLoading}
                    className="rounded-xl border-zinc-700 bg-black text-white placeholder:text-zinc-600 focus:border-white focus:ring-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white font-bold">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => updateFormData("password", e.target.value)}
                      disabled={isLoading}
                      className="pr-10 rounded-xl border-zinc-700 bg-black text-white placeholder:text-zinc-600 focus:border-white focus:ring-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-zinc-500">
                    Must be at least 8 characters with one number
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Profile */}
            {currentStep === 2 && (
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white font-bold">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => updateFormData("firstName", e.target.value)}
                    disabled={isLoading}
                    className="rounded-xl border-zinc-700 bg-black text-white placeholder:text-zinc-600 focus:border-white focus:ring-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-white font-bold">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => updateFormData("lastName", e.target.value)}
                    disabled={isLoading}
                    className="rounded-xl border-zinc-700 bg-black text-white placeholder:text-zinc-600 focus:border-white focus:ring-white"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Preferences */}
            {currentStep === 3 && (
              <div className="space-y-5">
                <div className="space-y-3">
                  <Label className="text-white font-bold">Primary Goal</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Brand Awareness", "Engagement", "Conversion", "Community"].map((goal) => (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => updateFormData("investmentGoal", goal)}
                        disabled={isLoading}
                        className={cn(
                          "p-4 rounded-2xl border-2 text-sm font-bold transition-all duration-300",
                          formData.investmentGoal === goal
                            ? "border-white bg-white text-black"
                            : "border-zinc-700 bg-black text-white hover:border-zinc-500"
                        )}
                      >
                        {goal}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-waxy-lime">
                  <p className="text-sm text-black font-bold">You're all set!</p>
                  <p className="text-xs text-black/70 mt-1">
                    Click finish to create your account and start creating.
                  </p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Navigation */}
          <div className="flex gap-3 mt-8">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={isLoading}
                className="flex-1 rounded-full border-zinc-700 bg-transparent text-white hover:bg-zinc-800 hover:text-white h-12"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}
            <Button
              type="button"
              onClick={currentStep === 3 ? handleSubmit : nextStep}
              disabled={isLoading}
              className="flex-1 bg-white text-black hover:bg-zinc-200 rounded-full font-bold h-12 disabled:opacity-50"
            >
              {isLoading ? "Creating account..." : currentStep === 3 ? "Finish" : "Continue"}
              {currentStep < 3 && !isLoading && <ArrowRight className="h-4 w-4 ml-2" />}
            </Button>
          </div>
        </div>

        <p className="text-center mt-6 text-sm text-zinc-500">
          Already have an account?{" "}
          <Link to="/login" className="text-white hover:underline font-bold">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;

