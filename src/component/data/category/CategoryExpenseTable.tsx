import React, {useState} from "react";
import {Box, Center, Flex, Heading, IconButton, Table, Tbody, Td, Th, Thead, Tr,} from "@chakra-ui/react";
import {AddIcon, DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {Category, CategoryProp,} from "../../../common/Types";
import {CategoryExpenseEditModal} from "./CategoryExpenseEditModal";
import DeleteExpenseCategoryAlert from "./CategoryExpenseDeleteAlert";
import {CategoryExpenseNewModal} from "./CategoryExpenseNewModal";

export default function CategoryExpenseTable(prop: CategoryProp) {
  const [modalStatus, setModalStatus] = useState(false);
  const [newModalStatus, setNewModalStatus] = useState(false);
  const [alertStatus, setAlertStatus] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>();
  const [deletingCategory, setDeletingCategory] = useState<Category | null>();

  function openDeleteAlert(category: Category) {
    setDeletingCategory(category);
    setAlertStatus(true);
  }

  function closeDeleteAlert() {
    setDeletingCategory(null);
    setAlertStatus(false);
  }

  function openEditModal(category: Category) {
    setEditingCategory(category);
    setModalStatus(true);
  }

  function handleCloseModal() {
    setEditingCategory(null);
    setModalStatus(false);
  }

  function openNewModal() {
    setNewModalStatus(true);
  }

  function closeNewModal() {
    setNewModalStatus(false);
  }

  // TODO: Consider re-adding in the future, but I don't see value in sorting categories on table right now.
  // const handleSort = (option: string) => {
  //     // categories.setSortMethod(option);
  //     console.log("Finish the sorting on backend!")
  //     prop.setReloading(true);
  // };

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
          Expense Categories Table
        </Heading>
        <Box>
          {/*<Select onChange={(e) => handleSort(e.target.value)}>*/}
          {/*    <option value="newest">Newest</option>*/}
          {/*    <option value="oldest">Oldest</option>*/}
          {/*    <option value="smallest">Ascending</option>*/}
          {/*    <option value="largest">Descending</option>*/}
          {/*</Select>*/}
        </Box>
        <Box>
          <IconButton
            aria-label="Add Account"
            colorScheme="green"
            icon={<AddIcon />}
            size="sm"
            onClick={() => openNewModal()}
          />
        </Box>
      </Flex>
      <Box maxH="500px" overflow="auto" p="6px">
        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Monthly Budget</Th>
              <Th>Created On</Th>
              <Th>Last Updated</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {prop.categories && prop.categories.length > 0 ? (
              prop.categories.map((category: Category) => (
                <Tr key={category.id}>
                  <Td>{category.name}</Td>
                  <Td>{"$" + category.monthly_budget.toLocaleString()}</Td>
                  <Td>
                    {new Date(category.created_at).toLocaleDateString("en-US", {
                      month: "2-digit",
                      day: "2-digit",
                      year: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Td>
                  <Td>
                    {new Date(category.updated_at).toLocaleDateString("en-US", {
                      month: "2-digit",
                      day: "2-digit",
                      year: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Td>
                  <Td>
                    <IconButton
                      aria-label="Edit"
                      colorScheme="blue"
                      icon={<EditIcon />}
                      size="sm"
                      onClick={() => openEditModal(category)}
                      mr={2}
                    />
                    <IconButton
                      aria-label="Delete"
                      colorScheme="red"
                      icon={<DeleteIcon />}
                      size="sm"
                      onClick={() => openDeleteAlert(category)}
                    />
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={6}>
                  <Center>
                    No categories found... why not try adding some? 💰
                  </Center>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>
      {editingCategory && (
        <CategoryExpenseEditModal
          isOpen={modalStatus}
          onClose={() => {
            handleCloseModal();
          }}
          category={editingCategory}
          setReloading={prop.setReloading}
        />
      )}
      {deletingCategory && (
        <Center>
          <DeleteExpenseCategoryAlert
            isOpen={alertStatus}
            onClose={() => {
              closeDeleteAlert();
            }}
            category={deletingCategory}
            setReloading={prop.setReloading}
          />
        </Center>
      )}
      <CategoryExpenseNewModal
        isOpen={newModalStatus}
        onClose={closeNewModal}
        setReloading={prop.setReloading}
      />
    </Box>
  );
}
