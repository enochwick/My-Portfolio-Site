import { AtSign, Globe, Mail, Link } from 'lucide-react';
import { MinimalistHero } from '@/components/ui/minimalist-hero';

// Demo / usage of the MinimalistHero with Henok's real content + portrait.
const MinimalistHeroDemo = () => {
  const navLinks = [
    { label: 'WORK', href: '#portfolio' },
    { label: 'ABOUT', href: '#about' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'CONTACT', href: '#contact' },
  ];

  // lucide brand icons (Facebook/Instagram/etc.) were removed from core,
  // so these are generic stand-ins — swap hrefs for real profiles.
  const socialLinks = [
    { icon: AtSign, href: '#' },
    { icon: Globe, href: '#' },
    { icon: Mail, href: 'mailto:eshiutopia@gmail.com' },
    { icon: Link, href: '#' },
  ];

  return (
    <MinimalistHero
      logoText="henok."
      navLinks={navLinks}
      mainText="Creative director and AI builder crafting brand systems, polished interfaces, and production-ready AI tools that ship."
      readMoreLink="#about"
      imageSrc="/images/portrait.png"
      imageAlt="Henok Tadesse"
      overlayText={{
        part1: 'design &',
        part2: 'build.',
      }}
      socialLinks={socialLinks}
      locationText="Remote · Worldwide"
    />
  );
};

export default MinimalistHeroDemo;
