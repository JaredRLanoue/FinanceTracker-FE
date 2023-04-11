import { useState } from "react";
import {
  Box,
  Center,
  Flex,
  IconButton,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
// import * as Yup from "yup";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { EditAccountModal } from "./EditAccountModal";
import { NewAccountModal } from "./NewAccountModal";
import DeleteAlert from "./DeleteAlert";
import { bool } from "yup";

interface AccountsTableProps {
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

export default function AccountsTable(accounts: AccountsTableProps) {
  const [modalStatus, setModalStatus] = useState(false);
  const [newModalStatus, setNewModalStatus] = useState(false);
  const [alertStatus, setAlertStatus] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>();
  const [deletingAccount, setDeletingAccount] = useState<Account | null>();

  function openDeleteAlert(account: Account) {
    setDeletingAccount(account);
    setAlertStatus(true);
  }

  function closeDeleteAlert() {
    setDeletingAccount(null);
    setAlertStatus(false);
  }

  function openEditAccountModal(account: Account) {
    setEditingAccount(account);
    setModalStatus(true);
  }

  function handleCloseModal() {
    setEditingAccount(null);
    setModalStatus(false);
  }

  function openNewAccountModal() {
    setNewModalStatus(true);
  }

  function closeNewAccountModal() {
    setNewModalStatus(false);
  }

  const handleSort = (option: string) => {
    accounts.setSortMethod(option);
    accounts.setReloading(true);
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      backgroundColor="white"
      p="4"
      boxShadow="lg"
      width="100%"
      maxWidth="1200px"
      margin="0 auto"
    >
      <Flex justify="space-between" align="center" mb="4">
        <Box>
          <Select onChange={(e) => handleSort(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="smallest">Smallest</option>
            <option value="largest">Largest</option>
          </Select>
        </Box>
        <Box>
          <IconButton
            aria-label="Add Account"
            colorScheme="green"
            icon={<AddIcon />}
            size="sm"
            onClick={() => openNewAccountModal()}
          />
        </Box>
      </Flex>
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Type</Th>
            <Th>Balance</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {accounts.data && accounts.data.length > 0 ? (
            accounts.data.map((account: Account) => (
              <Tr key={account.id}>
                <Td>{account.name}</Td>
                <Td>{account.type}</Td>
                <Td>${account.balance}</Td>
                <Td>
                  <IconButton
                    aria-label="Edit"
                    colorScheme="blue"
                    icon={<EditIcon />}
                    size="sm"
                    onClick={() => openEditAccountModal(account)}
                    mr={2}
                  />
                  <IconButton
                    aria-label="Delete"
                    colorScheme="red"
                    icon={<DeleteIcon />}
                    size="sm"
                    onClick={() => openDeleteAlert(account)}
                  />
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={4}>
                <Center>
                  No accounts found... why not try adding some? 💰
                </Center>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
      {editingAccount && (
        <EditAccountModal
          isOpen={modalStatus}
          onClose={() => {
            handleCloseModal();
          }}
          accountData={editingAccount}
          setReloading={accounts.setReloading}
        />
      )}
      {deletingAccount && (
        <Center>
          <DeleteAlert
            isOpen={alertStatus}
            onClose={() => {
              closeDeleteAlert();
            }}
            accountData={deletingAccount}
            setReloading={accounts.setReloading}
          />
        </Center>
      )}
      <NewAccountModal
        isOpen={newModalStatus}
        onClose={closeNewAccountModal}
        setReloading={accounts.setReloading}
      />
    </Box>
  );
}
