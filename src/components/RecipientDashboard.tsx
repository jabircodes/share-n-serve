import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Search, Filter, Clock, Package, Truck, Heart } from "lucide-react";
import { FoodListing } from "@/components/FoodListing";
import { useToast } from "@/hooks/use-toast";

const RecipientDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const { toast } = useToast();

  // Mock data for available food listings
  const availableListings = [
    {
      id: 1,
      foodName: "Fresh Bread & Pastries",
      quantity: "20 loaves + assorted pastries",
      description: "Day-old bread and pastries from our bakery. All items are fresh and safe to consume.",
      category: "Bakery",
      expiryTime: "2024-01-20T18:00:00",
      pickupWindow: "Today 4:00 PM - 7:00 PM",
      location: "Downtown Bakery, Main St",
      distance: "0.3 km",
      status: "available" as const,
      claimedBy: null,
      createdAt: "2024-01-20T10:00:00"
    },
    {
      id: 3,
      foodName: "Fresh Vegetables",
      quantity: "Mixed vegetables - 5 kg",
      description: "Slightly imperfect but fresh vegetables from our farm. Great for cooking healthy meals.",
      category: "Fresh Produce",
      expiryTime: "2024-01-21T12:00:00",
      pickupWindow: "Tomorrow 9:00 AM - 12:00 PM",
      location: "Green Valley Farm Store",
      distance: "2.1 km",
      status: "available" as const,
      claimedBy: null,
      createdAt: "2024-01-20T16:00:00"
    },
    {
      id: 4,
      foodName: "Sandwiches & Salads",
      quantity: "30 sandwiches, 15 salads",
      description: "Prepared lunch items from office catering. All vegetarian options available.",
      category: "Prepared Meals",
      expiryTime: "2024-01-20T20:00:00",
      pickupWindow: "Today 5:00 PM - 8:00 PM",
      location: "Corporate Center, Business District",
      distance: "1.8 km",
      status: "available" as const,
      claimedBy: null,
      createdAt: "2024-01-20T12:30:00"
    }
  ];

  // Mock claimed listings
  const claimedListings = [
    {
      id: 2,
      foodName: "Cooked Rice & Curry",
      quantity: "Serves 15-20 people",
      description: "Freshly cooked vegetarian curry with rice from today's lunch prep.",
      category: "Prepared Meals",
      expiryTime: "2024-01-20T22:00:00",
      pickupWindow: "Today 6:00 PM - 9:00 PM",
      location: "Community Kitchen, Oak Ave",
      distance: "1.2 km",
      status: "claimed" as const,
      claimedBy: "You",
      createdAt: "2024-01-20T14:30:00"
    }
  ];

  const handleClaimFood = (listingId: number) => {
    toast({
      title: "Food Claimed Successfully!",
      description: "You've claimed this food donation. Check the pickup details and contact information.",
      variant: "default"
    });
  };

  const handleRequestDelivery = (listingId: number) => {
    toast({
      title: "Delivery Requested",
      description: "Redirecting to payment for delivery service via M-Pesa or card...",
      variant: "default"
    });
    // In real app, would redirect to IntaSend payment flow
  };

  const filteredListings = availableListings.filter(listing => {
    const matchesSearch = listing.foodName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === "all" || 
                         listing.category.toLowerCase().replace(/\s+/g, '-') === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const stats = [
    { label: "Food Claimed", value: "8", color: "text-primary" },
    { label: "Meals Received", value: "42", color: "text-secondary" },
    { label: "Money Saved", value: "KES 1,250", color: "text-success" },
    { label: "Active Claims", value: "1", color: "text-trust" }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Find Food Near You</h1>
          <p className="text-muted-foreground">Discover and claim available food donations in your area</p>
        </div>
        <Button variant="outline" className="border-trust text-trust hover:bg-trust hover:text-trust-foreground">
          <MapPin className="mr-2 h-4 w-4" />
          Map View
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 text-center shadow-elegant">
            <div className={`text-3xl font-bold mb-2 ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-sm text-muted-foreground">
              {stat.label}
            </div>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <Card className="p-6 shadow-elegant">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search for food items..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter("all")}
            >
              All
            </Button>
            <Button
              variant={selectedFilter === "fresh-produce" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter("fresh-produce")}
            >
              Produce
            </Button>
            <Button
              variant={selectedFilter === "prepared-meals" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter("prepared-meals")}
            >
              Meals
            </Button>
            <Button
              variant={selectedFilter === "bakery" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter("bakery")}
            >
              Bakery
            </Button>
          </div>
        </div>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="available" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="available" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Available Food ({filteredListings.length})
          </TabsTrigger>
          <TabsTrigger value="claimed" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            My Claims ({claimedListings.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-6">
          {filteredListings.length === 0 ? (
            <Card className="p-12 text-center">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No food available</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm ? "No food matches your search." : "Check back later for new donations."}
              </p>
              {searchTerm && (
                <Button onClick={() => setSearchTerm("")} variant="outline">
                  Clear Search
                </Button>
              )}
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredListings.map((listing) => (
                <FoodListing
                  key={listing.id}
                  listing={listing}
                  userRole="recipient"
                  onClaim={() => handleClaimFood(listing.id)}
                  onRequestDelivery={() => handleRequestDelivery(listing.id)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="claimed" className="space-y-6">
          {claimedListings.length === 0 ? (
            <Card className="p-12 text-center">
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No claimed food yet</h3>
              <p className="text-muted-foreground mb-6">When you claim food donations, they'll appear here</p>
              <Button onClick={() => {}} variant="outline">
                Browse Available Food
              </Button>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Delivery Status Card */}
              <Card className="p-6 border-l-4 border-l-secondary bg-secondary/5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-secondary/20 p-2 rounded-full">
                      <Truck className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Delivery in Progress</h4>
                      <p className="text-sm text-muted-foreground">Your food from Community Kitchen is being delivered</p>
                    </div>
                  </div>
                  <Badge className="bg-secondary/10 text-secondary border-secondary/20">
                    ETA: 25 mins
                  </Badge>
                </div>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {claimedListings.map((listing) => (
                  <FoodListing
                    key={listing.id}
                    listing={listing}
                    userRole="recipient"
                  />
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { RecipientDashboard };