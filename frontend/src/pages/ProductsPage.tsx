import { useQueryState } from "nuqs";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { AlertCircle, ArrowDownNarrowWide, ArrowUpNarrowWide, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { LoadingCard } from "../components/loaders/LoadingCard";
import { Product } from "../types/product";
import { axiosInstance } from "../lib/axios";
import ProductCard from "../components/product/ProductCard";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";
import { Button } from "../components/ui/button";

const categories: Product["category"][] = [
  "cpu",
  "motherboard",
  "gpu",
  "ram",
  "storage",
  "power_supply",
  "case",
  "cooling",
];

const ProductsPage = () => {
  const [page, setPage] = useQueryState("page", { defaultValue: "1" });
  const [limit, setLimit] = useQueryState("limit", { defaultValue: "12" });
  const [sort, setSort] = useQueryState("sort", { defaultValue: "price" });
  const [order, setOrder] = useQueryState("order", { defaultValue: "asc" });
  const [name, setName] = useQueryState("name");
  const [category, setCategory] = useQueryState("category");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", page, limit, sort, order, name, category],
    queryFn: async () => {
      const params = new URLSearchParams({
        page,
        limit,
        sort,
        order,
        ...(name && { name }),
        ...(category && { category }),
      });

      const res = await axiosInstance.get(`/product?${params}`);
      return res.data as {
        data: Product[];
        pagination: {
          currentPage: number;
          totalPages: number;
          totalItems: number;
          itemsPerPage: number;
        };
      };
    },
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage.toString());
  };

  const resetFilters = () => {
    setName(null);
    setCategory(null);
    setSort("price");
    setOrder("asc");
    setPage("1");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-8 text-3xl font-bold">All Products</h1>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row  sm:flex-wrap ">
        <Input
          placeholder="Search by name..."
          value={name || ""}
          onChange={(e) => setName(e.target.value || null)}
          className="w-full sm:max-w-[200px]"
        />

        <Select value={category || ""} onValueChange={(value) => setCategory(value || null)}>
          <SelectTrigger className="w-full sm:max-w-[150px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat.replace("_", " ").toUpperCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Button
            variant={sort === "price" && order === "asc" ? "default" : "outline"}
            onClick={() => {
              setSort("price");
              setOrder("asc");
            }}
          >
            <ArrowUpNarrowWide className="mr-2 size-4" />
            <span className="hidden md:block">Price Low to High</span>
            <span className="block md:hidden">Price</span>
          </Button>

          <Button
            variant={sort === "price" && order === "desc" ? "default" : "outline"}
            onClick={() => {
              setSort("price");
              setOrder("desc");
            }}
          >
            <ArrowDownNarrowWide className="mr-2 size-4" />
            <span className="hidden md:block">Price High to Low</span>
            <span className="block md:hidden">Price</span>
          </Button>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" onClick={resetFilters}>
            <X className="mr-2 size-4" />
            Reset Filters
          </Button>

          <Select value={limit} onValueChange={(value) => setLimit(value)}>
            <SelectTrigger className="w-[80px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12">12</SelectItem>
              <SelectItem value="24">24</SelectItem>
              <SelectItem value="48">48</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Failed to load products. Please try again later.</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          Array.from({ length: Number(limit) }).map((_, i) => <LoadingCard key={i} />)
        ) : data?.data.length ? (
          data.data.map((product) => <ProductCard key={product.product_id} product={product} />)
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No products found matching your criteria</p>
          </div>
        )}
      </div>

      {data?.pagination && data.pagination.totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <Button
                  variant="outline"
                  disabled={data.pagination.currentPage === 1}
                  onClick={() => handlePageChange(data.pagination.currentPage - 1)}
                >
                  <PaginationPrevious />
                </Button>
              </PaginationItem>

              <span className="mx-4 flex items-center text-sm text-muted-foreground">
                Page {data.pagination.currentPage} of {data.pagination.totalPages}
              </span>

              <PaginationItem>
                <Button
                  variant="outline"
                  disabled={data.pagination.currentPage >= data.pagination.totalPages}
                  onClick={() => handlePageChange(data.pagination.currentPage + 1)}
                >
                  <PaginationNext />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
