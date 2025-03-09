import { Navigate, Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./lib/axios";

import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import ProdcutsPage from "./pages/ProductsPage";
import { UserType } from "./types/user";
import ProdcutDetailPage from "./pages/ProductDetailPage";
import CategoriesPage from "./pages/categories/CategoriesPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/auth/ProfilePage";
import TransactionsPage from "./pages/auth/TransactionsPage";
import CategoriesPageCpu from "./pages/categories/CategoriesPageCpu";
import CategoriesPageMotherboard from "./pages/categories/CategoriesPageMotherboard";
import CategoriesPageCooling from "./pages/categories/CategoriesPageCooling";
import CategoriesPageRam from "./pages/categories/CategoriesPageRam";
import CategoriesPageCase from "./pages/categories/CategoriesPageCase";
import CategoriesPagePsu from "./pages/categories/CategoriesPagePsu";
import CategoriesPageGpu from "./pages/categories/CategoriesPageGpu";
import CategoriesPageStorage from "./pages/categories/CategoriesPageStorage";
import AddProductPage from "./pages/auth/AddProductPage";

const App = () => {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get<UserType>("/user/me");
        return res.data;
      } catch (error) {
        return null;
      }
    },
    retry: false,
  });

  if (isLoading) return null;

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProdcutsPage />} />
        <Route path="/products/:id" element={<ProdcutDetailPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories/cpu" element={<CategoriesPageCpu />} />
        <Route path="/categories/motherboard" element={<CategoriesPageMotherboard />} />
        <Route path="/categories/cooling" element={<CategoriesPageCooling />} />
        <Route path="/categories/ram" element={<CategoriesPageRam />} />
        <Route path="/categories/case" element={<CategoriesPageCase />} />
        <Route path="/categories/psu" element={<CategoriesPagePsu />} />
        <Route path="/categories/gpu" element={<CategoriesPageGpu />} />
        <Route path="/categories/storage" element={<CategoriesPageStorage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to={"/"} />} />
        <Route
          path="/transactions"
          element={authUser ? <TransactionsPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/add-product"
          element={authUser?.role === "admin" ? <AddProductPage /> : <Navigate to={"/"} />}
        />
      </Routes>
      <Toaster />
    </Layout>
  );
};

export default App;
