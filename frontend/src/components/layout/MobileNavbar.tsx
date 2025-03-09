import { Link } from "react-router";
import { Menu } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import { UserType } from "../../types/user";

export interface MenuItem {
  label: string;
  href: string;
}

export const menuItems: MenuItem[] = [
  { label: "Products", href: "/products" },
  { label: "Categories", href: "/categories" },
];

interface MobileNavbarProps {
  menuItems: MenuItem[];
  authUser?: UserType;
  logout: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const MobileNavbar = ({
  menuItems,
  authUser,
  logout,
  isOpen,
  setIsOpen,
}: MobileNavbarProps) => {
  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="size-6" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Navigation Menu</SheetTitle>
            <SheetDescription>Access all pages and account options here.</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col space-y-4 mt-4 ml-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t pt-4">
              {authUser ? (
                <>
                  <Link
                    to="/profile"
                    className="block py-2 text-sm font-medium transition-colors hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/transactions"
                    className="block py-2 text-sm font-medium transition-colors hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Transactions
                  </Link>

                  {authUser?.role === "admin" && (
                    <Link
                      to="/add-product"
                      className="block py-2 text-sm font-medium transition-colors hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      Add Product
                    </Link>
                  )}

                  <Button
                    variant="ghost"
                    className="w-full justify-start px-0"
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)}>
                    <Button className="w-full">Sign up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
