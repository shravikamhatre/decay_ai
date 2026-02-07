import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  TrendingUp,
  Calendar,
  Zap,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Star,
  Brain,
  AlertTriangle,
  RefreshCw,
  Share2,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ScrollVelocity from "@/components/ui/ScrollVelocity";
import TypingEffect from "@/components/ui/TypingEffect";
import { Timeline } from "@/components/ui/timeline";

const Landing = () => {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden font-sans selection:bg-[#2DD881] selection:text-black">

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="w-full flex h-20 items-center justify-between px-6 md:px-12">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-black rounded-full flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>
            <span className="text-2xl font-black tracking-tighter">the decay</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="font-bold hover:underline decoration-2 underline-offset-4">Log In</Link>
            <Link to="/signup">
              <Button className="bg-black text-white hover:bg-black/80 rounded-full px-6 font-bold text-base transition-all">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-6 overflow-hidden bg-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 pt-20">
            <div className="text-left max-w-2xl relative z-10">
              <motion.h1
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="font-airone text-7xl md:text-9xl font-bold text-black leading-[0.9] mb-8 lowercase tracking-tighter"
              >
                <span className="font-quote italic">the</span> decay
              </motion.h1>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row items-center justify-start gap-6"
              >
                <Link to="/signup">
                  <Button className="h-14 px-8 text-lg font-bold rounded-full bg-black text-white hover:bg-gray-800 transition-all shadow-waxy">
                    Start Tracking Now
                  </Button>
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
              className="max-w-md text-right md:text-right"
            >
              <p className="font-quote text-2xl md:text-3xl font-normal italic leading-relaxed text-gray-800">
                "Spot decline so early, Your competitors will still be posting."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Scrolling Text */}
      <section className="py-20 bg-white overflow-hidden border-y border-gray-100">
        <ScrollVelocity
          texts={[
            <span className="inline-flex items-center gap-4 whitespace-nowrap">
              <span className="bg-waxy-lime px-6 py-2 rounded-full text-black border border-black inline-flex items-center justify-center">Fashion & Beauty</span>
              <span className="bg-waxy-blue px-6 py-2 rounded-full text-black border border-black inline-flex items-center justify-center">Tech & Gadgets</span>
              <span className="bg-waxy-pink px-6 py-2 rounded-full text-black border border-black inline-flex items-center justify-center">Food & Cooking</span>
            </span>,
            <span className="inline-flex items-center gap-4 whitespace-nowrap">
              <span className="bg-waxy-yellow px-6 py-2 rounded-full text-black border border-black inline-flex items-center justify-center">Travel & Lifestyle</span>
              <span className="bg-waxy-mint px-6 py-2 rounded-full text-black border border-black inline-flex items-center justify-center">Gaming & Esports</span>
              <span className="bg-waxy-terracotta px-6 py-2 rounded-full text-black border border-black inline-flex items-center justify-center">Education</span>
            </span>
          ]}
          velocity={50}
          className="font-sans text-4xl md:text-6xl text-black py-4 lowercase select-none tracking-tight"
        />
      </section>



      {/* Typing Effect Section */}
      <section className="py-32 bg-black text-white flex justify-center items-center px-6">
        <div className="max-w-5xl text-center">
          <TypingEffect
            text="your content isn't bad. your timing is. let us fix that."
            className="font-airone text-4xl md:text-6xl font-bold leading-relaxed text-center lowercase"
            speed={50}
            startDelay={500}
            cursorClassName="bg-waxy-lime w-3 h-12 md:h-16 translate-y-2"
          />
        </div>
      </section>



      {/* How It Works Section */}
      <section className="bg-black text-white border-t border-white/10" id="how-it-works">
        <div className="w-full">
          <Timeline
            data={[
              {
                title: "step 01",
                content: (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1, boxShadow: "0 0 60px -15px rgba(250, 204, 21, 0.6)" }}
                    viewport={{ margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="bg-waxy-yellow p-8 rounded-3xl text-black shadow-lg"
                  >
                    <h3 className="font-airone font-bold text-2xl md:text-4xl mb-4 lowercase">Pick your niche</h3>
                    <p className="text-black/80 text-lg leading-relaxed font-medium">
                      Fashion, tech, finance, whatever. We track trends you care about. Not the ones you don't.
                    </p>
                  </motion.div>
                ),
              },
              {
                title: "step 02",
                content: (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1, boxShadow: "0 0 60px -15px rgba(132, 204, 22, 0.6)" }}
                    viewport={{ margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="bg-waxy-lime p-8 rounded-3xl text-black shadow-lg"
                  >
                    <h3 className="font-airone font-bold text-2xl md:text-4xl mb-4 lowercase">We predict the collapse</h3>
                    <p className="text-black/80 text-lg leading-relaxed font-medium">
                      Our AI spots engagement drops, influencer exodus, saturation, algorithm shifts. The stuff you miss while sleeping.
                    </p>
                  </motion.div>
                ),
              },
              {
                title: "step 03",
                content: (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1, boxShadow: "0 0 60px -15px rgba(236, 72, 153, 0.6)" }}
                    viewport={{ margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="bg-waxy-pink p-8 rounded-3xl text-black shadow-lg"
                  >
                    <h3 className="font-airone font-bold text-2xl md:text-4xl mb-4 lowercase">Post or pivot</h3>
                    <p className="text-black/80 text-lg leading-relaxed font-medium">
                      Green? Ship it. Yellow? Reconsider. Red? We'll swap it for something that's actually rising. Your choice.
                    </p>
                  </motion.div>
                ),
              },
            ]}
          />
        </div>
      </section>



      {/* Explainability Section */}
      <section className="py-24 px-6 bg-white text-black border-t border-gray-100">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="font-airone text-4xl md:text-6xl font-bold mb-4 lowercase">We show our work.</h2>
            <p className="text-xl text-gray-600">Because 'trust the algorithm' is a terrible answer.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Engagement dropping", desc: "Likes and shares down 30% week-over-week? We flag it yellow. Down 50%? Red. Math, not magic.", color: "bg-waxy-blue" },
              { title: "Influencer exodus", desc: "When top creators stop using a trend, everyone else follows. We track who's bailing. You get the heads up.", color: "bg-waxy-mint" },
              { title: "Content saturation", desc: "Ten thousand videos using the same audio this week versus two thousand last week? Oversaturated. We'll tell you to skip it.", color: "bg-waxy-yellow" },
              { title: "Algorithm penalties", desc: "Platform changed what it promotes? We detect it, explain it, and suggest alternatives. No guessing required.", color: "bg-waxy-pink" },
            ].map((item, i) => (
              <div key={i} className={cn("p-8 rounded-3xl transition-transform hover:scale-[1.02] text-black", item.color)}>
                <h3 className="font-airone font-bold text-xl mb-3 lowercase">{item.title}</h3>
                <p className="text-black/80 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 bg-black text-white border-t border-white/10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-airone text-4xl md:text-6xl font-bold lowercase">The numbers. Since you asked.</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { stat: "87%", label: "accuracy", sub: "We're right most of the time. Better odds than your gut feeling." },
              { stat: "2.3x", label: "engagement", sub: "Average boost for users who listen to the warnings instead of ignoring them." },
              { stat: "12hr", label: "head start", sub: "Spot decline half a day before your competitors notice something's wrong." },
              { stat: "64%", label: "less wasted", sub: "Stop throwing content at trends that are already dead." },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="font-airone font-bold text-5xl md:text-6xl mb-2 text-white">{item.stat}</div>
                <div className="font-bold text-lg mb-4 text-waxy-lime lowercase">{item.label}</div>
                <p className="text-sm text-gray-500 leading-relaxed">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white px-6 border-t border-gray-100">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-airone text-5xl md:text-7xl font-bold text-black mb-8 lowercase tracking-tighter">
            let's craft your success.
          </h2>
          <Link to="/signup">
            <Button className="h-14 px-10 text-lg font-bold rounded-full bg-black text-white hover:bg-gray-800 transition-all shadow-lg">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-20 pb-12 px-6 border-t border-gray-100">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 bg-black rounded-full flex items-center justify-center">
                  <span className="text-xl">⚡</span>
                </div>
                <span className="text-xl font-black tracking-tighter">the decay</span>
              </div>
              <p className="text-gray-500 leading-relaxed">
                Spot trends before they die. The only analytics tool that tells you when to stop posting.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Product</h4>
              <ul className="space-y-3 text-gray-500">
                <li><Link to="#" className="hover:text-black transition-colors">Features</Link></li>
                <li><Link to="#" className="hover:text-black transition-colors">Pricing</Link></li>
                <li><Link to="#" className="hover:text-black transition-colors">API</Link></li>
                <li><Link to="#" className="hover:text-black transition-colors">Integrations</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <ul className="space-y-3 text-gray-500">
                <li><Link to="#" className="hover:text-black transition-colors">About</Link></li>
                <li><Link to="#" className="hover:text-black transition-colors">Blog</Link></li>
                <li><Link to="#" className="hover:text-black transition-colors">Careers</Link></li>
                <li><Link to="#" className="hover:text-black transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Connect</h4>
              <div className="flex gap-4">
                <Link to="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-all">
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link to="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-all">
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link to="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-all">
                  <Linkedin className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-100 pt-8">
            <p className="text-gray-400 text-sm">© 2026 <span className="font-bold">the decay</span>. All rights reserved.</p>
            <div className="flex gap-8 font-medium text-gray-500 text-sm mt-4 md:mt-0">
              <Link to="#" className="hover:text-black transition-colors">Privacy Policy</Link>
              <Link to="#" className="hover:text-black transition-colors">Terms of Service</Link>
              <Link to="#" className="hover:text-black transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
