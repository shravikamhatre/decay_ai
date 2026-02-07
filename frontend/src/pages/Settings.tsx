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
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-foreground">Settings</h2>
        <p className="text-muted-foreground">Manage your account preferences</p>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card p-4 h-fit"
        >
          <nav className="space-y-1">
            {settingsSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                  activeSection === section.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
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
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-6">Profile Information</h3>

                <div className="flex items-center gap-6 mb-6">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                      alt="Profile"
                      className="h-20 w-20 rounded-2xl object-cover"
                    />
                    <button className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <User className="h-4 w-4" />
                    </button>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">John Doe</p>
                    <p className="text-sm text-muted-foreground">Premium Member</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-foreground">First Name</Label>
                    <Input
                      defaultValue="John"
                      className="bg-secondary/50 border-border/50 focus-visible:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Last Name</Label>
                    <Input
                      defaultValue="Doe"
                      className="bg-secondary/50 border-border/50 focus-visible:ring-primary"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-foreground">Email</Label>
                    <Input
                      type="email"
                      defaultValue="john.doe@example.com"
                      className="bg-secondary/50 border-border/50 focus-visible:ring-primary"
                    />
                  </div>
                </div>

                <Button className="mt-6 bg-primary hover:bg-primary/90 text-primary-foreground">
                  Save Changes
                </Button>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Danger Zone</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button variant="outline" className="text-destructive border-destructive/50 hover:bg-destructive/10">
                  Delete Account
                </Button>
              </div>
            </>
          )}

          {/* Security Settings */}
          {activeSection === "security" && (
            <>
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-6">Change Password</h3>

                <div className="space-y-4 max-w-md">
                  <div className="space-y-2">
                    <Label className="text-foreground">Current Password</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="bg-secondary/50 border-border/50 focus-visible:ring-primary pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">New Password</Label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="bg-secondary/50 border-border/50 focus-visible:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Confirm New Password</Label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="bg-secondary/50 border-border/50 focus-visible:ring-primary"
                    />
                  </div>
                </div>

                <Button className="mt-6 bg-primary hover:bg-primary/90 text-primary-foreground">
                  Update Password
                </Button>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Two-Factor Authentication</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/20 text-success">
                        <Smartphone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Authenticator App</p>
                        <p className="text-sm text-muted-foreground">Use an authenticator app</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-success">Enabled</span>
                      <Check className="h-4 w-4 text-success" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-muted-foreground">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Email Verification</p>
                        <p className="text-sm text-muted-foreground">Receive codes via email</p>
                      </div>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-muted-foreground">
                        <Lock className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Security Keys</p>
                        <p className="text-sm text-muted-foreground">Use hardware security keys</p>
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
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">Notification Preferences</h3>

              <div className="space-y-4">
                {[
                  { title: "Transaction Alerts", description: "Get notified for all transactions" },
                  { title: "AI Insights", description: "Receive AI-powered recommendations" },
                  { title: "Security Alerts", description: "Important security notifications" },
                  { title: "Marketing", description: "Product updates and promotions" },
                  { title: "Weekly Reports", description: "Weekly financial summary" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-xl bg-secondary/30"
                  >
                    <div>
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <Switch defaultChecked={index < 3} />
                  </div>
                ))}
              </div>

              <Button className="mt-6 bg-primary hover:bg-primary/90 text-primary-foreground">
                Save Preferences
              </Button>
            </div>
          )}

          {/* Billing Settings */}
          {activeSection === "billing" && (
            <>
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Current Plan</h3>

                <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">Premium Plan</p>
                      <p className="text-sm text-muted-foreground">$29/month • Billed monthly</p>
                    </div>
                    <span className="badge-success px-3 py-1 rounded-full text-xs font-medium">Active</span>
                  </div>
                </div>

                <Button variant="outline" className="border-border/50">
                  Change Plan
                </Button>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Payment Method</h3>

                <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white text-xs font-bold">
                      VISA
                    </div>
                    <div>
                      <p className="font-medium text-foreground">•••• •••• •••• 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 12/26</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>

                <Button variant="outline" className="border-border/50">
                  Add Payment Method
                </Button>
              </div>
            </>
          )}

          {/* Help & Support */}
          {activeSection === "help" && (
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">Help & Support</h3>

              <div className="space-y-3">
                {[
                  { title: "FAQ", description: "Frequently asked questions" },
                  { title: "Contact Support", description: "Get help from our team" },
                  { title: "Documentation", description: "Learn how to use Shelf Life" },
                  { title: "Community", description: "Join our community forum" },
                ].map((item, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="text-left">
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
