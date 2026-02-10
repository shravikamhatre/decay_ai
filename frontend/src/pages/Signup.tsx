import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Check, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, title: "Account" },
  { id: 2, title: "Profile" },
  { id: 3, title: "Content Focus" },
];

const Signup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
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

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
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
          <h1 className="font-airone text-3xl font-bold text-black mb-2 lowercase">join the decay</h1>
          <p className="text-gray-500">start your creator journey today</p>
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
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-400"
                )}
              >
                {currentStep > step.id ? <Check className="h-4 w-4" /> : step.id}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 w-12 mx-2 transition-all duration-300",
                    currentStep > step.id ? "bg-waxy-lime" : "bg-gray-100"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Signup Card */}
        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
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
                  <Label htmlFor="email" className="text-black font-bold">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    className="rounded-xl border-gray-200 focus:border-black focus:ring-black bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-black font-bold">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => updateFormData("password", e.target.value)}
                      className="pr-10 rounded-xl border-gray-200 focus:border-black focus:ring-black bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-400">
                    Must be at least 8 characters with one number
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Profile */}
            {currentStep === 2 && (
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-black font-bold">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => updateFormData("firstName", e.target.value)}
                    className="rounded-xl border-gray-200 focus:border-black focus:ring-black bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-black font-bold">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => updateFormData("lastName", e.target.value)}
                    className="rounded-xl border-gray-200 focus:border-black focus:ring-black bg-white"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Preferences */}
            {currentStep === 3 && (
              <div className="space-y-5">
                <div className="space-y-3">
                  <Label className="text-black font-bold">Primary Goal</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Brand Awareness", "Engagement", "Conversion", "Community"].map((goal) => (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => updateFormData("investmentGoal", goal)}
                        className={cn(
                          "p-4 rounded-2xl border-2 text-sm font-bold transition-all duration-300",
                          formData.investmentGoal === goal
                            ? "border-black bg-black text-white"
                            : "border-gray-200 bg-white text-black hover:border-gray-300"
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
                className="flex-1 rounded-full border-gray-200 hover:bg-white h-12"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}
            <Button
              type="button"
              onClick={currentStep === 3 ? () => {
                console.log("Submit:", formData);
                navigate("/onboarding");
              } : nextStep}
              className="flex-1 bg-black text-white hover:bg-gray-800 rounded-full font-bold h-12"
            >
              {currentStep === 3 ? "Finish" : "Continue"}
              {currentStep < 3 && <ArrowRight className="h-4 w-4 ml-2" />}
            </Button>
          </div>
        </div>

        <p className="text-center mt-6 text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-black hover:underline font-bold">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
