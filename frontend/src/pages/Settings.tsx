import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Shield,
  Bell,
  CreditCard,
  HelpCircle,
  ChevronRight,
  Check,
  Lock,
  Smartphone,
  Mail,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const settingsSections = [
  { id: "account", label: "Account", icon: User },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "help", label: "Help & Support", icon: HelpCircle },
];

const Settings = () => {
  const [activeSection, setActiveSection] = useState("account");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="px-6 md:px-12 pt-8 pb-6 border-b border-zinc-800">
        <h1 className="font-airone text-4xl md:text-5xl font-bold lowercase tracking-tight">settings</h1>
        <p className="text-zinc-400 mt-2">manage your account preferences</p>
      </div>

      <div className="px-6 md:px-12 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 h-fit"
          >
            <nav className="space-y-1">
              {settingsSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                    activeSection === section.id
                      ? "bg-white text-black"
                      : "text-zinc-500 hover:bg-zinc-800 hover:text-white"
                  )}
                >
                  <section.icon className="h-5 w-5" />
                  {section.label}
                  {activeSection === section.id && (
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  )}
                </button>
              ))}
            </nav>
          </motion.div>

          {/* Content Area */}
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Account Settings */}
            {activeSection === "account" && (
              <>
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                  <h3 className="font-airone text-lg font-bold lowercase mb-6">profile information</h3>

                  <div className="flex items-center gap-6 mb-6">
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                        alt="Profile"
                        className="h-20 w-20 rounded-2xl object-cover"
                      />
                      <button className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black">
                        <User className="h-4 w-4" />
                      </button>
                    </div>
                    <div>
                      <p className="font-bold text-white">John Doe</p>
                      <p className="text-sm text-zinc-500">Premium Member</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white font-bold">First Name</Label>
                      <Input
                        defaultValue="John"
                        className="rounded-xl bg-black border-zinc-800 text-white focus:border-white focus:ring-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white font-bold">Last Name</Label>
                      <Input
                        defaultValue="Doe"
                        className="rounded-xl bg-black border-zinc-800 text-white focus:border-white focus:ring-white"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label className="text-white font-bold">Email</Label>
                      <Input
                        type="email"
                        defaultValue="john.doe@example.com"
                        className="rounded-xl bg-black border-zinc-800 text-white focus:border-white focus:ring-white"
                      />
                    </div>
                  </div>

                  <Button className="mt-6 bg-white text-black hover:bg-zinc-200 rounded-full font-bold">
                    Save Changes
                  </Button>
                </div>

                <div className="bg-waxy-pink/10 border border-waxy-pink/20 rounded-2xl p-6">
                  <h3 className="font-airone text-lg font-bold lowercase mb-4 text-waxy-pink">danger zone</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <Button variant="outline" className="border-waxy-pink text-waxy-pink hover:bg-waxy-pink/10 rounded-full">
                    Delete Account
                  </Button>
                </div>
              </>
            )}

            {/* Security Settings */}
            {activeSection === "security" && (
              <>
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                  <h3 className="font-airone text-lg font-bold lowercase mb-6">change password</h3>

                  <div className="space-y-4 max-w-md">
                    <div className="space-y-2">
                      <Label className="text-white font-bold">Current Password</Label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pr-10 rounded-xl bg-black border-zinc-800 text-white focus:border-white focus:ring-white"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white font-bold">New Password</Label>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="rounded-xl bg-black border-zinc-800 text-white focus:border-white focus:ring-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white font-bold">Confirm New Password</Label>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="rounded-xl bg-black border-zinc-800 text-white focus:border-white focus:ring-white"
                      />
                    </div>
                  </div>

                  <Button className="mt-6 bg-white text-black hover:bg-zinc-200 rounded-full font-bold">
                    Update Password
                  </Button>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                  <h3 className="font-airone text-lg font-bold lowercase mb-4">two-factor authentication</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-waxy-lime text-black">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/10">
                          <Smartphone className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-bold">Authenticator App</p>
                          <p className="text-sm text-black/70">Use an authenticator app</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold">Enabled</span>
                        <Check className="h-4 w-4" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-black border border-zinc-800">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800">
                          <Mail className="h-5 w-5 text-zinc-500" />
                        </div>
                        <div>
                          <p className="font-bold text-white">Email Verification</p>
                          <p className="text-sm text-zinc-500">Receive codes via email</p>
                        </div>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-black border border-zinc-800">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800">
                          <Lock className="h-5 w-5 text-zinc-500" />
                        </div>
                        <div>
                          <p className="font-bold text-white">Security Keys</p>
                          <p className="text-sm text-zinc-500">Use hardware security keys</p>
                        </div>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Notifications Settings */}
            {activeSection === "notifications" && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <h3 className="font-airone text-lg font-bold lowercase mb-6">notification preferences</h3>

                <div className="space-y-4">
                  {[
                    { title: "Content Alerts", description: "Get notified for trending content", enabled: true },
                    { title: "AI Insights", description: "Receive AI-powered recommendations", enabled: true },
                    { title: "Security Alerts", description: "Important security notifications", enabled: true },
                    { title: "Marketing", description: "Product updates and promotions", enabled: false },
                    { title: "Weekly Reports", description: "Weekly performance summary", enabled: false },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-xl bg-black border border-zinc-800"
                    >
                      <div>
                        <p className="font-bold text-white">{item.title}</p>
                        <p className="text-sm text-zinc-500">{item.description}</p>
                      </div>
                      <Switch defaultChecked={item.enabled} />
                    </div>
                  ))}
                </div>

                <Button className="mt-6 bg-white text-black hover:bg-zinc-200 rounded-full font-bold">
                  Save Preferences
                </Button>
              </div>
            )}

            {/* Billing Settings */}
            {activeSection === "billing" && (
              <>
                <div className="bg-waxy-lime text-black rounded-2xl p-6">
                  <h3 className="font-airone text-lg font-bold lowercase mb-4">current plan</h3>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-xl">Premium Plan</p>
                      <p className="text-sm text-black/70">$29/month • Billed monthly</p>
                    </div>
                    <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-bold">Active</span>
                  </div>

                  <Button variant="outline" className="mt-4 border-black text-black hover:bg-black/10 rounded-full font-bold">
                    Change Plan
                  </Button>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                  <h3 className="font-airone text-lg font-bold lowercase mb-4">payment method</h3>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-black border border-zinc-800 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white text-xs font-bold">
                        VISA
                      </div>
                      <div>
                        <p className="font-bold text-white">•••• •••• •••• 4242</p>
                        <p className="text-sm text-zinc-500">Expires 12/26</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="font-bold text-white hover:text-white/80">Edit</Button>
                  </div>

                  <Button variant="outline" className="border-zinc-800 text-white hover:bg-zinc-800 rounded-full font-bold bg-transparent">
                    Add Payment Method
                  </Button>
                </div>
              </>
            )}

            {/* Help & Support */}
            {activeSection === "help" && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <h3 className="font-airone text-lg font-bold lowercase mb-6">help & support</h3>

                <div className="space-y-3">
                  {[
                    { title: "FAQ", description: "Frequently asked questions" },
                    { title: "Contact Support", description: "Get help from our team" },
                    { title: "Documentation", description: "Learn how to use the decay" },
                    { title: "Community", description: "Join our community forum" },
                  ].map((item, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center justify-between p-4 rounded-xl bg-black border border-zinc-800 hover:bg-zinc-800 transition-colors"
                    >
                      <div className="text-left">
                        <p className="font-bold text-white">{item.title}</p>
                        <p className="text-sm text-zinc-500">{item.description}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-zinc-600" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
