import { Link } from "react-router";

interface CategoryGridProps {
  columns?: string;
  isHome?: boolean;
  title?: string;
  padding?: string;
}

export const CategoryGrid = ({
  columns = "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
  title = "Shop by Category",
  padding = "py-16",
  isHome,
}: CategoryGridProps) => {
  let categories = [
    {
      name: "Processors",
      image: "/categories/7900x.avif",
      href: "/categories/cpu",
    },
    {
      name: "Motherboards",
      image: "/categories/x870e.jpg",
      href: "/categories/motherboard",
    },
    {
      name: "Processor Cooling",
      image: "/categories/aio.jpg",
      href: "/categories/cooling",
    },
    {
      name: "Ram",
      image: "/categories/ram.webp",
      href: "/categories/ram",
    },
    {
      name: "PC Cases",
      image: "/categories/h5.jpg",
      href: "/categories/case",
    },
    {
      name: "Power Supplies",
      image: "/categories/psu.jpg",
      href: "/categories/psu",
    },
    {
      name: "Graphics Cards",
      image: "/categories/4090.jpg",
      href: "/categories/gpu",
    },
    {
      name: "Storage",
      image: "/categories/m2.avif",
      href: "/categories/storage",
    },
  ];

  let toDisplay = isHome ? categories.slice(0, 6) : categories;

  return (
    <div className={`bg-muted/10 ${padding}`}>
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl font-bold mb-8">{title}</h2>
        <div className={`grid ${columns} gap-4`}>
          {toDisplay.map((category) => (
            <Link
              key={category.name}
              to={category.href}
              className="group relative overflow-hidden rounded-lg bg-background shadow-md transition-transform hover:scale-105"
            >
              <div className="aspect-square">
                <img
                  src={category.image || "placeholder.webp"}
                  alt={category.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
              <div className="absolute bottom-0 p-4">
                <h3 className="font-medium text-sm text-foreground">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
