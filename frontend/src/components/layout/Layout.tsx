import Navbar from "./Navbar";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <NuqsAdapter>{children}</NuqsAdapter>
      </main>
    </div>
  );
};
export default Layout;
