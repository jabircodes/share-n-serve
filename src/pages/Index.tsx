import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Heart, Smartphone, Shield } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { DonorDashboard } from "@/components/DonorDashboard";
import { RecipientDashboard } from "@/components/RecipientDashboard";
import { AdminDashboard } from "@/components/AdminDashboard";
import { Link } from "react-router-dom";

type UserRole = 'guest' | 'donor' | 'recipient' | 'ngo-admin' | 'platform-admin';

const Index = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>('guest');

  const features = [
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "Real-time Location",
      description: "Find surplus food near you with Google Maps integration"
    },
    {
      icon: <Clock className="h-6 w-6 text-secondary" />,
      title: "Expiry Tracking", 
      description: "Smart alerts before food expires to reduce waste"
    },
    {
      icon: <Smartphone className="h-6 w-6 text-trust" />,
      title: "M-Pesa Integration",
      description: "Secure payments via IntaSend for delivery & donations"
    },
    {
      icon: <Shield className="h-6 w-6 text-success" />,
      title: "Secure Platform",
      description: "Verified users and secure payment processing"
    }
  ];

  const stats = [
    { number: "10K+", label: "Meals Shared", color: "text-primary" },
    { number: "2.5K", label: "Active Donors", color: "text-secondary" },
    { number: "15K", label: "Families Helped", color: "text-trust" },
    { number: "50+", label: "Partner NGOs", color: "text-success" }
  ];

  if (currentRole !== 'guest') {
    return (
      <div className="min-h-screen bg-background">
        <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Heart className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold gradient-hero bg-clip-text text-transparent">
                Share-n-Serve
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                {currentRole === 'donor' && 'Donor'}
                {currentRole === 'recipient' && 'Recipient'}
                {currentRole === 'ngo-admin' && 'NGO Admin'}
                {currentRole === 'platform-admin' && 'Platform Admin'}
              </Badge>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setCurrentRole('guest')}
              >
                Switch Role
              </Button>
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-4 py-8">
          {currentRole === 'donor' && <DonorDashboard />}
          {currentRole === 'recipient' && <RecipientDashboard />}
          {(currentRole === 'ngo-admin' || currentRole === 'platform-admin') && <AdminDashboard />}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative container mx-auto px-4 py-24 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-primary/20 text-primary border-primary/30">
              <Heart className="h-4 w-4 mr-2" />
              Fighting Food Waste Together
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Share-n-Serve
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
              Connect surplus food with those in need. Real-time listings, secure payments, 
              and community impact tracking.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg"
                className="gradient-primary shadow-primary text-lg px-8 py-6 transition-bounce hover:scale-105"
                onClick={() => setCurrentRole('donor')}
              >
                <Users className="mr-2 h-5 w-5" />
                I'm a Donor
              </Button>
              <Button 
                size="lg"
                variant="secondary"
                className="gradient-secondary shadow-secondary text-lg px-8 py-6 transition-bounce hover:scale-105"
                onClick={() => setCurrentRole('recipient')}
              >
                <Heart className="mr-2 h-5 w-5" />
                I Need Food
              </Button>
            </div>
            <p className="text-white/90">
              Already have an account? <Link to="/auth" className="underline underline-offset-4">Sign in or create one</Link>
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color}`}>
                    {stat.number}
                  </div>
                  <div className="text-white/80 text-sm md:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform connects food donors with recipients through secure, 
              real-time technology and community partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center shadow-elegant hover:shadow-primary transition-smooth hover:-translate-y-1">
                <div className="mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Role Selection Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Choose Your Role</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Whether you're sharing surplus food or seeking assistance, 
              our platform serves different community needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card 
              className="p-6 text-center cursor-pointer transition-bounce hover:scale-105 shadow-elegant hover:shadow-primary"
              onClick={() => setCurrentRole('donor')}
            >
              <div className="gradient-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Food Donor</h3>
              <p className="text-muted-foreground mb-4">
                Share surplus food from restaurants, events, or households
              </p>
              <Button className="w-full" variant="outline">
                Get Started
              </Button>
            </Card>

            <Card 
              className="p-6 text-center cursor-pointer transition-bounce hover:scale-105 shadow-elegant hover:shadow-secondary"
              onClick={() => setCurrentRole('recipient')}
            >
              <div className="gradient-secondary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Food Recipient</h3>
              <p className="text-muted-foreground mb-4">
                Find and claim available food donations near you
              </p>
              <Button className="w-full" variant="outline">
                Browse Food
              </Button>
            </Card>

            <Card 
              className="p-6 text-center cursor-pointer transition-bounce hover:scale-105 shadow-elegant hover:shadow-trust"
              onClick={() => setCurrentRole('ngo-admin')}
            >
              <div className="gradient-trust w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-trust-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">NGO Admin</h3>
              <p className="text-muted-foreground mb-4">
                Track donations and manage community impact
              </p>
              <Button className="w-full" variant="outline">
                View Dashboard
              </Button>
            </Card>

            <Card 
              className="p-6 text-center cursor-pointer transition-bounce hover:scale-105 shadow-elegant hover:shadow-lg"
              onClick={() => setCurrentRole('platform-admin')}
            >
              <div className="bg-gradient-to-br from-success to-warning w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Platform Admin</h3>
              <p className="text-muted-foreground mb-4">
                Oversee platform operations and user management
              </p>
              <Button className="w-full" variant="outline">
                Admin Panel
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Share-n-Serve</span>
          </div>
          <p className="text-muted-foreground">
            Fighting food waste, feeding communities. Built with ❤️ for social impact.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;