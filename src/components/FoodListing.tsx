import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  MapPin, 
  Clock, 
  User, 
  Package, 
  Truck, 
  Heart, 
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export interface Listing {
  id: number;
  foodName: string;
  quantity: string;
  description: string;
  category: string;
  expiryTime: string;
  pickupWindow: string;
  location: string;
  distance: string;
  status: "available" | "claimed" | "expired";
  claimedBy: string | null;
  createdAt: string;
}

interface FoodListingProps {
  listing: Listing;
  userRole: "donor" | "recipient" | "admin";
  onClaim?: () => void;
  onRequestDelivery?: () => void;
  onUpdate?: () => void;
  onDelete?: () => void;
}

const FoodListing = ({ 
  listing, 
  userRole, 
  onClaim, 
  onRequestDelivery, 
  onUpdate, 
  onDelete 
}: FoodListingProps) => {
  const getTimeUntilExpiry = () => {
    const expiryDate = new Date(listing.expiryTime);
    const now = new Date();
    const diff = expiryDate.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 0) return { text: "Expired", color: "text-destructive", urgent: true };
    if (hours < 2) return { text: `${hours}h remaining`, color: "text-destructive", urgent: true };
    if (hours < 6) return { text: `${hours}h remaining`, color: "text-warning", urgent: true };
    return { text: `${hours}h remaining`, color: "text-success", urgent: false };
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "Fresh Produce": "bg-success/10 text-success border-success/20",
      "Prepared Meals": "bg-secondary/10 text-secondary border-secondary/20",
      "Bakery": "bg-warning/10 text-warning border-warning/20",
      "Dairy": "bg-trust/10 text-trust border-trust/20",
      "Packaged": "bg-primary/10 text-primary border-primary/20",
      default: "bg-muted text-muted-foreground"
    };
    return colors[category as keyof typeof colors] || colors.default;
  };

  const getStatusBadge = () => {
    switch (listing.status) {
      case "available":
        return (
          <Badge className="bg-success/10 text-success border-success/20">
            <CheckCircle className="h-3 w-3 mr-1" />
            Available
          </Badge>
        );
      case "claimed":
        return (
          <Badge className="bg-primary/10 text-primary border-primary/20">
            <User className="h-3 w-3 mr-1" />
            Claimed
          </Badge>
        );
      case "expired":
        return (
          <Badge className="bg-destructive/10 text-destructive border-destructive/20">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Expired
          </Badge>
        );
    }
  };

  const timeUntilExpiry = getTimeUntilExpiry();
  const createdTime = formatDistanceToNow(new Date(listing.createdAt), { addSuffix: true });

  return (
    <Card className={`p-6 shadow-elegant transition-smooth hover:shadow-primary ${
      timeUntilExpiry.urgent && listing.status === "available" 
        ? "border-l-4 border-l-warning bg-warning/5" 
        : ""
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-semibold">{listing.foodName}</h3>
            {getStatusBadge()}
          </div>
          <Badge variant="outline" className={getCategoryColor(listing.category)}>
            {listing.category}
          </Badge>
        </div>
        
        {userRole === "donor" && (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={onUpdate}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={onDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-4">
        {/* Quantity */}
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{listing.quantity}</span>
        </div>

        {/* Description */}
        {listing.description && (
          <p className="text-muted-foreground text-sm leading-relaxed">
            {listing.description}
          </p>
        )}

        {/* Location & Distance */}
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{listing.location}</span>
          <Badge variant="outline" className="text-xs">
            {listing.distance}
          </Badge>
        </div>

        {/* Timing Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Pickup: {listing.pickupWindow}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className={`h-4 w-4 ${timeUntilExpiry.color}`} />
              <span className={`text-sm font-medium ${timeUntilExpiry.color}`}>
                {timeUntilExpiry.text}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              Posted {createdTime}
            </span>
          </div>
        </div>

        {/* Claimed Info */}
        {listing.status === "claimed" && listing.claimedBy && (
          <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg border border-primary/20">
            <User className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary">
              {listing.claimedBy === "You" ? "Claimed by you" : `Claimed by ${listing.claimedBy}`}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        {userRole === "recipient" && listing.status === "available" && (
          <div className="flex gap-3 pt-2">
            <Button 
              onClick={onClaim}
              className="flex-1 gradient-primary"
            >
              <Heart className="mr-2 h-4 w-4" />
              Claim Food
            </Button>
            <Button 
              onClick={onRequestDelivery}
              variant="outline"
              className="flex-1 border-trust text-trust hover:bg-trust hover:text-trust-foreground"
            >
              <Truck className="mr-2 h-4 w-4" />
              Request Delivery
            </Button>
          </div>
        )}

        {userRole === "recipient" && listing.status === "claimed" && listing.claimedBy === "You" && (
          <div className="flex gap-3 pt-2">
            <Button 
              variant="outline"
              className="flex-1 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
            >
              <MapPin className="mr-2 h-4 w-4" />
              Get Directions
            </Button>
            <Button 
              variant="outline"
              className="flex-1 border-trust text-trust hover:bg-trust hover:text-trust-foreground"
            >
              <User className="mr-2 h-4 w-4" />
              Contact Donor
            </Button>
          </div>
        )}

        {/* Donor Stats */}
        {userRole === "donor" && (
          <div className="flex items-center justify-between pt-2 border-t">
            <span className="text-xs text-muted-foreground">
              Views: 24 | Interested: 5
            </span>
            {listing.status === "available" && (
              <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/20">
                Active
              </Badge>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export { FoodListing };