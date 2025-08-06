import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Home, Sparkles } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { name: 'Ana Sayfa', href: '#hero' },
    { name: 'Hakkımızda', href: '#about' },
    { name: 'Nasıl Çalışır', href: '#how-it-works' },
    { name: 'Örnek Çalışmalar', href: '/portfolio' },
    { name: 'İletişim', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('/')) {
      // External route - use React Router
      navigate(href);
    } else {
      // Internal section - only if we're on the home page
      if (location.pathname === '/') {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // If we're not on home page, navigate to home first
        navigate('/');
        // Then scroll after a short delay
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 bg-gradient-to-br from-ai to-ai-secondary rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">
              AI Dekor Dream
            </span>
            <Sparkles className="w-5 h-5 text-ai-secondary" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-muted-foreground hover:text-ai transition-colors duration-200 font-medium"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <Button 
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-ai to-ai-secondary hover:opacity-90 text-white font-semibold px-6 rounded-xl shadow-lg"
            >
              Hemen Başla
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background/95 backdrop-blur">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 bg-gradient-to-br from-ai to-ai-secondary rounded-lg flex items-center justify-center">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-foreground">
                  AI Dekor Dream
                </span>
              </div>
              <nav className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="text-left text-muted-foreground hover:text-ai transition-colors duration-200 font-medium py-2"
                  >
                    {item.name}
                  </button>
                ))}
                <Button 
                  onClick={() => navigate('/')}
                  className="bg-gradient-to-r from-ai to-ai-secondary hover:opacity-90 text-white font-semibold mt-6 rounded-xl"
                >
                  Hemen Başla
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;