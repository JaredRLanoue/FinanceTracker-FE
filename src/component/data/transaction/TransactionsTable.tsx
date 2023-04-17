import React, {useState} from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {AddIcon, ArrowDownIcon, ArrowUpIcon, ChevronDownIcon, DeleteIcon, EditIcon,} from "@chakra-ui/icons";
import {Transaction, TransactionsTableProps,} from "../../../common/Types";
import TransactionDeleteAlert from "./TransactionDeleteAlert";
import {TransactionEditModal} from "./TransactionEditModal";
import {TransactionNewModal} from "./TransactionNewModal";

export default function TransactionsTable(prop: TransactionsTableProps) {
  const [modalStatus, setModalStatus] = useState(false);
  const [newModalStatus, setNewModalStatus] = useState(false);
  const [alertStatus, setAlertStatus] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>();
  const [deletingTransaction, setDeletingTransaction] =
    useState<Transaction | null>();

  function openDeleteAlert(transaction: Transaction) {
    setDeletingTransaction(transaction);
    setAlertStatus(true);
  }

  function closeDeleteAlert() {
    setDeletingTransaction(null);
    setAlertStatus(false);
  }

  function openEditAccountModal(transaction: Transaction) {
    setEditingTransaction(transaction);
    setModalStatus(true);
  }

  function handleCloseModal() {
    setEditingTransaction(null);
    setModalStatus(false);
  }

  function openNewAccountModal() {
    setNewModalStatus(true);
  }

  function closeNewAccountModal() {
    setNewModalStatus(false);
  }

  // prop.data.map((x) => console.log(
  //     new Date(x.date).toLocaleDateString("en-US", {
  //       month: "2-digit" as "numeric" | "2-digit",
  //       day: "2-digit" as "numeric" | "2-digit",
  //       year: "2-digit",
  //       // hour: "2-digit",
  //       // minute: "2-digit",
  //     })
  // ));

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      backgroundColor="white"
      p="4"
      boxShadow="lg"
      width="100%"
      // maxWidth="1200px"
      margin="0 auto"
    >
      <Flex justify="space-between" align="center" mb="4">
        <Heading as="h2" size="md">
          Transactions Table
        </Heading>
        <Flex align="center">
          <Menu closeOnSelect={false} onClose={() => prop.setReloading(true)}>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              mr="8px"
              variant="solid"
            >
              Sort
            </MenuButton>
            <MenuList minWidth="240px">
              <MenuOptionGroup
                value={prop.sort}
                onChange={(value) => prop.setSortMethod(value.toString())}
                title="Order"
                type="radio"
              >
                <MenuItemOption value="newest">Newest</MenuItemOption>
                <MenuItemOption value="oldest">Oldest</MenuItemOption>
                <MenuItemOption value="smallest">
                  Ascending Amount
                </MenuItemOption>
                <MenuItemOption value="largest">
                  Descending Amount
                </MenuItemOption>
              </MenuOptionGroup>
              <MenuDivider />
              <MenuOptionGroup
                value={prop.type}
                onChange={(value) => prop.setType(value.toString())}
                title="Type"
                type="radio"
              >
                <MenuItemOption value="all">All</MenuItemOption>
                <MenuItemOption value="expenses">Expenses</MenuItemOption>
                <MenuItemOption value="incomes">Incomes</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
          <IconButton
            aria-label="Add Account"
            colorScheme="green"
            icon={<AddIcon />}
            size="sm"
            onClick={() => openNewAccountModal()}
          />
        </Flex>
      </Flex>
      <Box maxH="500px" overflow="auto" p="6px">
        <Table>
          <Thead>
            <Tr>
              <Th>Type</Th>
              <Th>Name</Th>
              <Th>Category</Th>
              <Th>Account</Th>
              <Th>Amount</Th>
              <Th>Date</Th>
              {/*<Th>Description</Th>*/}
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {prop.data && prop.data.length > 0 ? (
              prop.data.map((transaction: Transaction) => (
                <Tr key={transaction.id}>
                  <Td>{transaction.type}</Td>
                  <Td>{transaction.counter_party}</Td>
                  <Td>{transaction.category}</Td>
                  <Td>
                    {prop.accounts.data
                      .find((account) => account.id === transaction.account)
                      ?.name.toString()}
                  </Td>
                  <Td
                    className={
                      transaction.type === "Expense" ? "expense" : "income"
                    }
                  >
                    {transaction.type === "Expense" ? (
                      <ArrowDownIcon color="red.500" mr={1} />
                    ) : (
                      <ArrowUpIcon color="green.500" mr={1} />
                    )}
                    {"$" + transaction.amount.toLocaleString()}
                  </Td>
                  <Td>
                    {new Date(transaction.date).toLocaleDateString("en-US", {
                      month: "2-digit" as "numeric" | "2-digit",
                      day: "2-digit" as "numeric" | "2-digit",
                      year: "2-digit",
                      timeZone: "UTC",
                    })}
                  </Td>
                  <Td>
                    <IconButton
                      aria-label="Edit"
                      colorScheme="blue"
                      icon={<EditIcon />}
                      size="sm"
                      onClick={() => openEditAccountModal(transaction)}
                      mr={2}
                    />
                    <IconButton
                      aria-label="Delete"
                      colorScheme="red"
                      icon={<DeleteIcon />}
                      size="sm"
                      onClick={() => openDeleteAlert(transaction)}
                    />
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={6}>
                  <Center>
                    No transactions found... why not try adding some? 💰
                  </Center>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>
      {editingTransaction && (
        <TransactionEditModal
          isOpen={modalStatus}
          onClose={() => {
            handleCloseModal();
          }}
          transaction={editingTransaction}
          setReloading={prop.setReloading}
          accounts={prop.accounts}
          incomeCategories={prop.incomeCategories}
          expenseCategories={prop.expenseCategories}
        />
      )}
      {deletingTransaction && (
        <Center>
          <TransactionDeleteAlert
            isOpen={alertStatus}
            onClose={() => {
              closeDeleteAlert();
            }}
            transaction={deletingTransaction}
            setReloading={prop.setReloading}
          />
        </Center>
      )}
      <TransactionNewModal
        isOpen={newModalStatus}
        onClose={closeNewAccountModal}
        setReloading={prop.setReloading}
        accounts={prop.accounts}
        incomeCategories={prop.incomeCategories}
        expenseCategories={prop.expenseCategories}
      />
    </Box>
  );
}
