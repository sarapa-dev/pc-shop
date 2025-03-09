import { CategoryGrid } from "../../components/home/CategoryGrid";

const CategoriesPage = () => {
  return (
    <div>
      <CategoryGrid columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" padding="py-8" />
    </div>
  );
};
export default CategoriesPage;
