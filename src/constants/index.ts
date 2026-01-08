import { Calculator, Share2, TrendingUp, Users } from "lucide-react";

export const STORAGE_KEY_EXPENSES = "spense-tracker-expenses";
export const STORAGE_KEY_PEOPLE = "spense-tracker-people";
export const STORAGE_KEY_SETTLEMENTS = "spense-tracker-settlements";

export const FEATURE_CARDS = [
  {
    title: "Smart Calculations",
    description: "Automatically calculate who owes what with equal or custom splits",
    icon: Calculator,
  },
  {
    title: "Group Friendly",
    description: "Add friends and roommates to track shared expenses together",
    icon: Users,
  },
  {
    title: "Balance Tracking",
    description: "Clear overview of debts and credits with visual indicators",
    icon: TrendingUp,
  },
  {
    title: "Easy Sharing",
    description: "Invite others with simple join codes or shareable links",
    icon: Share2,
  }
];

export const TAB_ITEMS = [
  { id: "balance", label: "Balance" },
  { id: "expense", label: "Expenses" },
  { id: "addExpense", label: "Add Expenses" },
]