import { BoxProps, FlexProps } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { ReactText } from "react";

export interface AccountsTableProps {
  data: Account[];
  setSortMethod: (reloading: string) => void;
  setReloading: (reloading: boolean) => void;
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

export interface NewAccountModalProps {
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
  number?: string;
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