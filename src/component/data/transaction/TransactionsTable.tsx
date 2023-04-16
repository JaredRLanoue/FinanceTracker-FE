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

export default function TransactionsTable(transaction: TransactionsTableProps) {
  const [modalStatus, setModalStatus] = useState(false);
  const [newModalStatus, setNewModalStatus] = useState(false);
  const [alertStatus, setAlertStatus] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Transaction | null>();
  const [deletingAccount, setDeletingAccount] = useState<Transaction | null>();
  const [selectedSorting, setSelectedSorting] = useState("newest");
  const [selectedType, setSelectedType] = useState("all");

  function openDeleteAlert(transaction: Transaction) {
    setDeletingAccount(transaction);
    setAlertStatus(true);
  }

  function closeDeleteAlert() {
    setDeletingAccount(null);
    setAlertStatus(false);
  }

  function openEditAccountModal(transaction: Transaction) {
    setEditingAccount(transaction);
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

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      backgroundColor="white"
      p="4"
      boxShadow="lg"
      width="100%"
      maxWidth="1500px"
      margin="0 auto"
    >
      <Flex justify="space-between" align="center" mb="4">
        <Heading as="h2" size="md">
          Transactions Table
        </Heading>
        <Flex align="center">
          <Menu
            closeOnSelect={false}
            onClose={() => transaction.setReloading(true)}
          >
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
                value={transaction.sort}
                onChange={(value) =>
                  transaction.setSortMethod(value.toString())
                }
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
                value={transaction.type}
                onChange={(value) => transaction.setType(value.toString())}
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
              <Th >Type</Th>
              <Th>Counter Party</Th>
              <Th>Category</Th>
              <Th>Amount</Th>
              <Th>Date</Th>
              {/*<Th>Description</Th>*/}
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transaction.data && transaction.data.length > 0 ? (
              transaction.data.map((transaction: Transaction) => (
                <Tr key={transaction.id}>
                  <Td>{transaction.type}</Td>
                  <Td>{transaction.counter_party}</Td>
                  <Td>{transaction.category}</Td>
                  <Td className={transaction.type === "Expense" ? "expense" : "income"}>
                    {transaction.type === "Expense" ? (
                        <ArrowDownIcon color="red.500" mr={1}/>
                    ) : (
                        <ArrowUpIcon color="green.500" mr={1}/>
                    )}
                    {"$" + transaction.amount.toLocaleString()}
                  </Td>
                  <Td>
                    {new Date(transaction.date).toLocaleDateString("en-US", {
                      month: "2-digit",
                      day: "2-digit",
                      year: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Td>
                  {/*<Td width="10%">*/}
                  {/*    <Tooltip*/}
                  {/*        label={transaction.description}*/}
                  {/*        bg="white"*/}
                  {/*        color="black"*/}
                  {/*    >*/}
                  {/*        <Text maxW="200px" isTruncated _hover={{bg: "white"}}>*/}
                  {/*            {transaction.description}*/}
                  {/*        </Text>*/}
                  {/*    </Tooltip>*/}
                  {/*</Td>*/}
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
      {/*{editingAccount && (*/}
      {/*  <AccountEditModal*/}
      {/*    isOpen={modalStatus}*/}
      {/*    onClose={() => {*/}
      {/*      handleCloseModal();*/}
      {/*    }}*/}
      {/*    accountData={editingAccount}*/}
      {/*    setReloading={accounts.setReloading}*/}
      {/*  />*/}
      {/*)}*/}
      {deletingAccount && (
        <Center>
          <TransactionDeleteAlert
            isOpen={alertStatus}
            onClose={() => {
              closeDeleteAlert();
            }}
            transaction={deletingAccount}
            setReloading={transaction.setReloading}
          />
        </Center>
      )}
      {/*)}*/}
      {/*<AccountNewModal*/}
      {/*  isOpen={newModalStatus}*/}
      {/*  onClose={closeNewAccountModal}*/}
      {/*  setReloading={accounts.setReloading}*/}
      {/*/>*/}
    </Box>
  );
}
