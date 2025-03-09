import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Link } from "react-router";

const products = [
  {
    id: 1,
    name: "NVIDIA RTX 4080",
    price: 1199,
    image: "/placeholder.svg?height=400&width=400",
    href: "/product/rtx-4080",
  },
  {
    id: 2,
    name: "AMD Ryzen 9 7950X",
    price: 699,
    image: "/placeholder.svg?height=400&width=400",
    href: "/product/ryzen-7950x",
  },
  {
    id: 3,
    name: "ASUS ROG STRIX Z790-E",
    price: 499,
    image: "/placeholder.svg?height=400&width=400",
    href: "/product/rog-strix-z790",
  },
  {
    id: 4,
    name: "Corsair RM850x",
    price: 149,
    image: "/placeholder.svg?height=400&width=400",
    href: "/product/rm850x",
  },
];

export const FeaturedProducts = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === products.length - 1 ? 0 : prevIndex + 1));
  }, [products]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? products.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative overflow-hidden bg-background py-16">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        <div className="relative">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {products.map((product) => (
              <div key={product.id} className="w-full flex-none px-4 md:w-1/2 lg:w-1/3">
                <Link to={product.href} className="group block">
                  <div className="aspect-square overflow-hidden rounded-lg bg-muted">
                    <img
                      src={product.image || "/placeholder.webp"}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">{product.name}</h3>
                  <p className="mt-1 text-lg font-semibold">${product.price}</p>
                </Link>
              </div>
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2"
            onClick={prevSlide}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            disabled={currentIndex === products.length / 5}
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2"
            onClick={nextSlide}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
