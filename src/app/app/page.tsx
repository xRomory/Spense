import { Metadata } from "next";
import { ExpenseTracker } from "./_components/expense-tracker";


export const metadata: Metadata = {
  title: "Spense Expense Tracker",
  description: "Expense Tracker Page",
};

const ExpenseTrackerPage = () => {
  return <ExpenseTracker />;
};

export default ExpenseTrackerPage;