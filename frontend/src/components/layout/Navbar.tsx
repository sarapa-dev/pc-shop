import { Link } from "react-router";
import { ModeToggle } from "../ui/mode-toggle";
import { Button } from "../../components/ui/button";
import { ShoppingCart, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { useState } from "react";
import { MobileNavbar } from "./MobileNavbar";
import { useCartStore } from "../../store/store";
import { UserType } from "../../types/user";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const totalItems = useCartStore((state) => state.totalItems());

  const { data: authUser } = useQuery<UserType>({ queryKey: ["authUser"] });

  const { mutate: logout } = useMutation({
    mutationFn: () => axiosInstance.post("/user/logout"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      setIsOpen(false);
    },
  });

  const menuItems = [
    { label: "Products", href: "/products" },
    { label: "Categories", href: "/categories" },
  ];

  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-primary font-mono tracking-wider">
              PC Shop
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {authUser?.role === "admin" ? (
              <></>
            ) : (
              <Link to="/cart" className="relative">
                <ShoppingCart className="size-6" />
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full size-4 text-xs flex items-center justify-center">
                  {totalItems}
                </span>
              </Link>
            )}
            <ModeToggle />

            <div className="hidden md:block">
              {authUser ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="size-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/transactions">Transactions</Link>
                    </DropdownMenuItem>
                    {authUser?.role === "admin" && (
                      <DropdownMenuItem>
                        <Link to="/add-product">Add Product</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/login">
                    <Button variant={"outline"}>Login</Button>
                  </Link>
                  <Link to="/signup">
                    <Button>Sign up</Button>
                  </Link>
                </div>
              )}
            </div>

            <MobileNavbar
              menuItems={menuItems}
              authUser={authUser}
              logout={() => logout()}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
