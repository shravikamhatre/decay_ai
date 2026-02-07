import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  Shield,
  Zap,
  PieChart,
  Brain,
  ChevronRight,
  Star,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const words = ["Viral", "Trending", "Engaging", "Effortless"];

const features = [
  {
    icon: Brain,
    title: "Trend Intelligence",
    description: "Get personalized content recommendations powered by advanced AI trend analysis.",
  },
  {
    icon: Zap,
    title: "Smart Scheduling",
    description: "Lightning-fast scheduling with intelligent best-time-to-post predictions.",
  },
  {
    icon: PieChart,
    title: "Engagement Analytics",
    description: "Real-time performance tracking with predictive virality metrics.",
  },
  {
    icon: Shield,
    title: "Brand Safety",
    description: "Enterprise-grade security with complete privacy and content protection.",
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Content Creator",
    content: "Shelf Life transformed how I manage my content. The trend insights are incredibly accurate.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Michael Torres",
    role: "Social Media Manager",
    content: "The calendar planning is phenomenal. I've increased audience engagement by 40% in just 6 months.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Emily Watson",
    role: "Digital Strategist",
    content: "Best social media tool I've used. The UI is beautiful and the AI recommendations are spot-on.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden grain-overlay">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-warm">
              <Sun className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-display font-bold text-foreground">Shelf Life</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Testimonials</a>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Log In</Button>
            </Link>
            <Link to="/signup">
              <Button size="sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-36">
        {/* Solar Noir Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="warm-blob warm-blob-amber w-[600px] h-[600px] top-0 left-1/2 -translate-x-1/2 -translate-y-1/4" />
          <div className="warm-blob warm-blob-orange w-[400px] h-[400px] top-1/3 right-0 translate-x-1/4" style={{ animationDelay: '2s' }} />
          <div className="warm-blob warm-blob-amber w-[300px] h-[300px] bottom-0 left-1/4 translate-y-1/2" style={{ animationDelay: '4s' }} />
        </div>

        <div className="container relative mx-auto px-6 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm font-medium text-primary shadow-warm-sm">
              <Sparkles className="h-4 w-4" />
              AI-Powered Content Platform
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-foreground mb-8 tracking-tight"
          >
            Your Content,{" "}
            <span className="relative">
              <motion.span
                key={words[0]}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gradient-gold"
              >
                Amplified
              </motion.span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed"
          >
            Experience the future of creator management with AI-driven insights,
            seamless scheduling, and intelligent audience optimization.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/signup">
              <Button variant="golden" size="lg" className="gap-2">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="gap-2">
                View Demo
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          >
            {[
              { value: "2.4B+", label: "Views Generated" },
              { value: "150K+", label: "Active Creators" },
              { value: "99.9%", label: "Uptime" },
              { value: "4.9★", label: "Creator Rating" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                <p className="text-4xl md:text-5xl font-display font-bold text-gradient-gold">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 md:py-36 relative">
        <div className="absolute inset-0 bg-secondary/30" />
        <div className="container relative mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Powerful Features for <span className="text-gradient-gold">Content Impact</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Everything you need to manage, grow, and protect your content in one beautiful platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-8 hover-lift cursor-pointer group"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:shadow-warm-lg">
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 md:py-36">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Loved by <span className="text-gradient-gold">Thousands</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              See what our users have to say about their experience with Shelf Life.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-8"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground text-lg mb-8 leading-relaxed">{testimonial.content}</p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/20"
                  />
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-36">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-12 md:p-20 text-center relative overflow-hidden"
          >
            {/* Decorative blobs */}
            <div className="absolute top-0 left-0 w-[300px] h-[300px] warm-blob warm-blob-amber -translate-x-1/2 -translate-y-1/2 opacity-50" />
            <div className="absolute bottom-0 right-0 w-[250px] h-[250px] warm-blob warm-blob-orange translate-x-1/3 translate-y-1/3 opacity-50" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
                Ready to Transform Your Socials?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-10 text-lg">
                Join thousands of users who have already revolutionized their digital journey.
              </p>
              <Link to="/signup">
                <Button variant="golden" size="lg" className="gap-2">
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-warm">
                  <Sun className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-display font-bold text-foreground">Shelf Life</span>
              </div>
              <p className="text-muted-foreground">
                The future of intelligent content management.
              </p>
            </div>

            <div>
              <h4 className="font-display font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-border text-center text-muted-foreground">
            © 2026 Shelf Life. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
