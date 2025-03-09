import { useQuery } from "@tanstack/react-query";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Transaction } from "../../types/transaction";
import { axiosInstance } from "../../lib/axios";
import { TransactionsTable } from "../../components/TransactionsTable";
import { LoadingTransactions } from "../../components/loaders/LoadingTransactions";

const TransactionsPage = () => {
  const {
    data: transactions,
    isLoading,
    error,
  } = useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: async () => {
      const res = await axiosInstance.get<Transaction[]>("/transactions");
      return res.data;
    },
  });

  if (error) {
    return (
      <div className="container mx-auto md:p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Failed to load transactions. Please try again later.</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isLoading || !transactions) {
    return (
      <div className="container mx-auto md:p-6">
        <LoadingTransactions />
      </div>
    );
  }

  return (
    <div className="container mx-auto md:p-6">
      <TransactionsTable transactions={transactions} />
    </div>
  );
};

export default TransactionsPage;
