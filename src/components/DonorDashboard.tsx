import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, MapPin, Clock, Package, Camera } from "lucide-react";
import { FoodListing } from "@/components/FoodListing";
import { useToast } from "@/hooks/use-toast";

const DonorDashboard = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    foodName: "",
    quantity: "",
    description: "",
    expiryTime: "",
    pickupWindow: "",
    category: ""
  });

  const { toast } = useToast();

  // Mock data for donor's listings
  const [listings, setListings] = useState([
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
      id: 2,
      foodName: "Cooked Rice & Curry",
      quantity: "Serves 15-20 people",
      description: "Freshly cooked vegetarian curry with rice from today's lunch prep. Packed in clean containers.",
      category: "Prepared Meals",
      expiryTime: "2024-01-20T22:00:00",
      pickupWindow: "Today 6:00 PM - 9:00 PM", 
      location: "Community Kitchen, Oak Ave",
      distance: "1.2 km",
      status: "claimed" as const,
      claimedBy: "Sarah M.",
      createdAt: "2024-01-20T14:30:00"
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newListing = {
      id: Date.now(),
      ...formData,
      location: "Your Current Location", // Would use actual geolocation
      distance: "0 km",
      status: "available" as const,
      claimedBy: null,
      createdAt: new Date().toISOString()
    };

    setListings(prev => [newListing, ...prev]);
    setFormData({
      foodName: "",
      quantity: "",
      description: "",
      expiryTime: "",
      pickupWindow: "",
      category: ""
    });
    setShowCreateForm(false);

    toast({
      title: "Listing Created!",
      description: "Your food donation is now visible to recipients in your area.",
      variant: "default"
    });
  };

  const stats = [
    { label: "Total Donations", value: "24", color: "text-primary" },
    { label: "People Fed", value: "156", color: "text-secondary" },  
    { label: "Food Saved (kg)", value: "89", color: "text-success" },
    { label: "Active Listings", value: "2", color: "text-trust" }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Donor Dashboard</h1>
          <p className="text-muted-foreground">Manage your food donations and track your impact</p>
        </div>
        <Button 
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="gradient-primary shadow-primary"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Listing
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

      {/* Create Listing Form */}
      {showCreateForm && (
        <Card className="p-6 shadow-elegant">
          <h2 className="text-2xl font-semibold mb-6">Create New Food Listing</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="foodName">Food Item Name *</Label>
                <Input
                  id="foodName"
                  placeholder="e.g., Fresh Vegetables, Cooked Rice"
                  value={formData.foodName}
                  onChange={(e) => setFormData(prev => ({...prev, foodName: e.target.value}))}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity *</Label>
                <Input
                  id="quantity"
                  placeholder="e.g., 10 servings, 5 kg, 20 pieces"
                  value={formData.quantity}
                  onChange={(e) => setFormData(prev => ({...prev, quantity: e.target.value}))}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Additional details about the food, preparation method, storage conditions..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({...prev, category: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fresh-produce">Fresh Produce</SelectItem>
                    <SelectItem value="prepared-meals">Prepared Meals</SelectItem>
                    <SelectItem value="bakery">Bakery Items</SelectItem>
                    <SelectItem value="dairy">Dairy Products</SelectItem>
                    <SelectItem value="packaged">Packaged Foods</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="expiryTime">Expiry Time *</Label>
                <Input
                  id="expiryTime"
                  type="datetime-local"
                  value={formData.expiryTime}
                  onChange={(e) => setFormData(prev => ({...prev, expiryTime: e.target.value}))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pickupWindow">Pickup Window *</Label>
                <Input
                  id="pickupWindow"
                  placeholder="e.g., Today 2:00 PM - 6:00 PM"
                  value={formData.pickupWindow}
                  onChange={(e) => setFormData(prev => ({...prev, pickupWindow: e.target.value}))}
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button type="button" variant="outline" className="flex-1">
                <Camera className="mr-2 h-4 w-4" />
                Add Photo
              </Button>
              <Button type="button" variant="outline" className="flex-1">
                <MapPin className="mr-2 h-4 w-4" />
                Set Location
              </Button>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1 gradient-primary">
                <Package className="mr-2 h-4 w-4" />
                Create Listing
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowCreateForm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* My Listings */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">My Food Listings</h2>
        
        {listings.length === 0 ? (
          <Card className="p-12 text-center">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No listings yet</h3>
            <p className="text-muted-foreground mb-6">Create your first food donation listing to get started</p>
            <Button onClick={() => setShowCreateForm(true)} className="gradient-primary">
              <Plus className="mr-2 h-4 w-4" />
              Create First Listing
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {listings.map((listing) => (
              <FoodListing 
                key={listing.id} 
                listing={listing} 
                userRole="donor"
                onUpdate={() => {
                  // Handle listing updates
                  toast({
                    title: "Listing updated",
                    description: "Your listing has been successfully updated."
                  });
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { DonorDashboard };