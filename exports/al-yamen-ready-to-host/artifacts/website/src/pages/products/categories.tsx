import { useListCategories } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Package, Monitor, Armchair, Pencil, Wrench } from "lucide-react";

const iconMap: Record<string, typeof Package> = {
  Electronics: Monitor,
  Furniture: Armchair,
  Stationery: Pencil,
  Tools: Wrench,
};

export default function Categories() {
  const { data: categories, isLoading } = useListCategories();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Product Categories</h1>
        <p className="text-muted-foreground">Browse products by category.</p>
      </div>
      {isLoading ? (
        <div className="text-center py-8 text-muted-foreground">Loading categories...</div>
      ) : categories?.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">No categories found. Add products to see categories.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories?.map((cat) => {
            const Icon = iconMap[cat.name] || Package;
            return (
              <Card key={cat.name} className="bg-card/50 backdrop-blur border-border hover:border-primary/40 transition-colors cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-medium">{cat.name}</h3>
                  <p className="text-2xl font-light text-primary mt-1">{cat.count} items</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
