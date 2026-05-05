import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { profileData } from "@/data/portfolio-data";
import { ChevronDown, Download, ArrowRight, MapPin } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import ParallaxLayer from "@/lib/motion/ParallaxLayer";

const HeroSection = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = profileData.roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentRole.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % profileData.roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRoleIndex]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden noise-overlay pt-24">
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 bg-primary"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-10 bg-accent"
        animate={{ scale: [1.2, 1, 1.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 section-container text-center">
        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm text-xs font-medium"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="text-foreground/90">Available for senior roles & contracts</span>
          <span className="text-muted-foreground hidden sm:inline">· Remote · Dubai · Onsite</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground text-base md:text-lg mb-3"
        >
          Hello, I'm
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.05]"
        >
          <span className="gradient-text animate-gradient">{profileData.name}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="h-12 md:h-16 flex items-center justify-center mb-6"
        >
          <span className="text-xl md:text-3xl font-display text-foreground/85">
            {displayText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="ml-1 inline-block w-0.5 h-7 md:h-8 bg-primary align-middle"
            />
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-foreground/80 text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed"
        >
          {profileData.tagline}
        </motion.p>

        {/* Proof chips */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="flex flex-wrap justify-center gap-2 mb-10 max-w-3xl mx-auto"
        >
          {profileData.proofChips.map((chip) => (
            <span
              key={chip}
              className="px-3 py-1.5 text-xs md:text-sm font-medium rounded-full border border-border/50 bg-card/40 backdrop-blur-sm text-foreground/85"
            >
              {chip}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <MagneticButton onClick={() => scrollTo("projects")} strength={0.3}>
            <span className="group inline-flex items-center bg-gradient-to-r from-primary to-[hsl(170,80%,45%)] text-primary-foreground font-semibold px-8 py-4 text-lg rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 cursor-pointer">
              See Case Studies
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </MagneticButton>
          <MagneticButton onClick={() => scrollTo("contact")} strength={0.3}>
            <span className="group inline-flex items-center border border-primary/40 bg-card/30 backdrop-blur-sm hover:bg-primary/10 px-8 py-4 text-lg rounded-xl transition-all duration-300 cursor-pointer font-medium">
              Hire Me
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </MagneticButton>
          <MagneticButton as="a" href={profileData.resumeUrl} download strength={0.3}>
            <span className="group inline-flex items-center border border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/50 px-6 py-4 text-base rounded-xl transition-all duration-300 cursor-pointer font-medium">
              <Download className="mr-2 w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
              Resume
            </span>
          </MagneticButton>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-8 text-xs text-muted-foreground flex items-center justify-center gap-1.5"
        >
          <MapPin className="w-3.5 h-3.5" />
          Trusted by enterprise teams across UK · USA · Canada · India
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="cursor-pointer"
            onClick={() => scrollTo("value")}
          >
            <ChevronDown className="w-7 h-7 text-muted-foreground hover:text-primary transition-colors" />
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
