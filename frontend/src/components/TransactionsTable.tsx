import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Transaction } from "../types/transaction";
import { formatDate } from "../lib/utils";

interface TransactionsTableProps {
  transactions: Transaction[];
}

export const TransactionsTable = ({ transactions }: TransactionsTableProps) => {
  const totalAmount = transactions.reduce(
    (sum, transaction) => sum + Number.parseFloat(transaction.total_price),
    0
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transactions History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <span className="hidden md:inline-block">Transaction</span> ID
                </TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.transaction_id}>
                  <TableCell className="font-medium">#{transaction.transaction_id}</TableCell>
                  <TableCell>{formatDate(transaction.created_at)}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {transaction.transaction_product.map((item) => (
                        <div
                          key={`${transaction.transaction_id}-${item.product_id}`}
                          className="text-sm"
                        >
                          {item.quantity}x {item.product.name}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    ${Number.parseFloat(transaction.total_price).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-lg font-semibold">Total Amount</div>
        <div className="text-2xl font-bold">${totalAmount.toFixed(2)}</div>
      </CardFooter>
    </Card>
  );
};
