import {BoxProps, FlexProps} from "@chakra-ui/react";
import {IconType} from "react-icons";
import {ReactText} from "react";

export interface AccountsTableProps {
  data: Account[];
  setSortMethod: (reloading: string) => void;
  setReloading: (reloading: boolean) => void;
  sort: string;
}

export interface Account {
  id: string;
  name: string;
  type: string;
  balance: number;
  starting_balance: number;
  expenses: any[];
  incomes: any[];
  created_at: string;
  updated_at: string;
}

export interface AccountList {
  data: Account[];
  meta: AccountMeta;
}

export interface AccountMeta {
  total: number;
  average: number;
  netWorth: number;
}

export interface NewEntityModalProps {
  isOpen: boolean;
  onClose: () => void;
  setReloading: (reloading: boolean) => void;
}

export interface EditAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountData: Account;
  setReloading: (reloading: boolean) => void;
}

export interface StatBoxProps {
  label: string;
  number: number;
}

export interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  isActive: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthenticationResponse {
  token: string;
}

export interface DeleteAlertProps {
  isOpen: boolean;
  onClose: () => void;
  accountData: Account;
  setReloading: (reloading: boolean) => void;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthenticationResponse {
  token: string;
}

export interface MobileProps extends FlexProps {
  onOpen: () => void;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  net_worth: number;
  role: string;
}

export interface SidebarProps extends BoxProps {
  onClose: () => void;
}

export interface LinkItemProps {
  name: string;
  icon: IconType;
}

export interface ExpenseCategory {
  category: string;
  total: number;
  budget: number;
}

export interface ExpenseCategories {
  categories: ExpenseCategory[];
}

export interface ExpenseCategoriesProp {
  categories: ExpenseCategory[];
  setSortMethod: (reloading: string) => void;
  setReloading: (reloading: boolean) => void;
  sort: string;
}

export interface CategoryList {
  categories: Category[];
}

export interface Category {
  id: string;
  name: string;
  monthly_budget: number;
  created_at: string;
  updated_at: string;
}

export interface CategoryProp {
  categories: Category[];
  setReloading: (reloading: boolean) => void;
}

export interface EditExpenseCategoryProp {
  isOpen: boolean;
  onClose: () => void;
  category: Category;
  setReloading: (reloading: boolean) => void;
}

export interface DeleteExpenseCategoryAlertProp {
  isOpen: boolean;
  onClose: () => void;
  category: Category;
  setReloading: (reloading: boolean) => void;
}

export interface TransactionsTableProps {
  data: Transaction[];
  setSortMethod: (sort: string) => void;
  setReloading: (reloading: boolean) => void;
  setType: (type: string) => void;
  type: string;
  sort: string;
}

export interface TransactionList {
  data: Transaction[];
  meta: TransactionMeta;
}

export interface TransactionMeta {
  totalExpenses: number;
  totalIncomes: number;
  averageTransaction: number;
}

export interface Transaction {
  id: string;
  type: string;
  category: string;
  amount: number;
  description: number;
  counter_party: string;
  date: string;
}

export interface DeleteTransactionAlertProp {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction;
  setReloading: (reloading: boolean) => void;
}
