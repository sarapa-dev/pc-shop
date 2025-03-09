import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router";

export const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:py-32">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Build Your Dream PC</h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Discover premium computer components for your perfect build. From high-performance
              GPUs to reliable PSUs, we've got everything you need.
            </p>
            <div className="mt-8 flex gap-4">
              <Button asChild size="lg">
                <Link to="/products">
                  Shop Now <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              {/* <Button variant="outline" size="lg" asChild>
                <Link to="/build">Build Guide</Link>
              </Button> */}
            </div>
          </div>
          <div className="relative">
            <img
              src="/gaming_pc.webp"
              alt="Featured Gaming PC"
              className="rounded-lg object-cover sm:max-w-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
