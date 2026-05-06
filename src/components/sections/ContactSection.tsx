import { useState } from "react";
import AmbientDepth from "@/lib/motion/AmbientDepth";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/lib/animations";
import { profileData } from "@/data/portfolio-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  Mail, 
  Linkedin, 
  Github, 
  Send, 
  MapPin, 
  CheckCircle2,
  Loader2
} from "lucide-react";

const socialLinks = [
  { icon: Mail, href: `mailto:${profileData.email}`, label: "Email", color: "hover:text-primary" },
  { icon: Linkedin, href: profileData.linkedin, label: "LinkedIn", color: "hover:text-[#0A66C2]" },
  { icon: Github, href: profileData.github, label: "GitHub", color: "hover:text-foreground" },
];

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Message sent successfully! I'll get back to you soon.");

    // Reset after animation
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <AmbientDepth variant="mixed" intensity={0.6} />
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 to-transparent" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

      <div className="section-container relative z-10">
        <AnimatedSection>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-4">
            Have a project in mind? Let's discuss how we can work together
          </p>
          <div className="w-20 h-1 mx-auto rounded-full bg-gradient-to-r from-primary to-accent mb-16" />
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact info */}
          <AnimatedSection delay={0.2}>
            <div className="space-y-8">
              <div>
                <h3 className="font-display text-2xl font-bold mb-4">
                  Let's build something amazing
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  I'm always excited to work on new projects and collaborate with 
                  innovative teams. Whether you need a senior Angular developer, 
                  a full-stack solution, or technical consultation, I'm here to help.
                </p>
              </div>

              {/* Contact details */}
              <div className="space-y-4">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 p-4 glass-card rounded-xl"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{profileData.email}</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 p-4 glass-card rounded-xl"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">Available for Remote Work</p>
                  </div>
                </motion.div>
              </div>

              {/* Social links */}
              <div>
                <p className="text-sm text-muted-foreground mb-4">Connect with me</p>
                <div className="flex gap-4">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ y: -5, scale: 1.1 }}
                      className={`w-12 h-12 rounded-xl glass-card flex items-center justify-center text-muted-foreground ${link.color} transition-colors`}
                    >
                      <link.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Contact form */}
          <AnimatedSection delay={0.4}>
            <motion.form
              onSubmit={handleSubmit}
              className="glass-card p-8 rounded-3xl space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Name
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="bg-background/50 border-border/50 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Email
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="bg-background/50 border-border/50 focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Subject
                </label>
                <Input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry"
                  required
                  className="bg-background/50 border-border/50 focus:border-primary"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Message
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={5}
                  required
                  className="bg-background/50 border-border/50 focus:border-primary resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="w-full bg-gradient-to-r from-primary to-[hsl(170,80%,45%)] text-primary-foreground font-semibold py-6 rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </motion.form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
