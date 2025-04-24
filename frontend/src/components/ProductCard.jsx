import { useState } from "react";
import {
  Box,
  Image,
  Heading,
  HStack,
  Text,
  IconButton,
  useColorModeValue,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  VStack,
  Button,
  useDisclosure,
  ModalFooter,
} from "@chakra-ui/react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { useProductStore } from "../store/product.js";

const ProductCard = ({ product }) => {
  const { deleteProduct, updateProduct } = useProductStore();
  const textColor = useColorModeValue("gray.600", "grey.200");
  const bgColor = useColorModeValue("white", "gray.800");
  const toast = useToast();
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = async (id) => {
    const { success, message } = await deleteProduct(id);

    if (success) {
      toast({
        title: "Product deleted",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error deleting product",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    onClose();
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: "Product updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      bg={bgColor}
      overflow="hidden"
      transition="all 0.3s"
      _hover={{
        transform: "translateY(-5px)",
        shadow: "xl",
      }}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontSize="xl" fontWeight="bold" color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack spacing={4}>
          <IconButton
            colorScheme="blue"
            aria-label="Call Segun"
            size="lg"
            icon={<CiEdit />}
            onClick={onOpen}
          />
          <IconButton
            colorScheme="red"
            aria-label="Call Segun"
            size="lg"
            onClick={() => {
              handleDelete(product._id);
            }}
            icon={<MdDeleteForever />}
          />
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              />
              <Input
                placeholder="Price"
                name="price"
                type="number"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
            >
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
