import React from "react";
import {
  Box,
  Image,
  Heading,
  HStack,
  Text,
  IconButton,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { useProductStore } from "../store/product.js";

const ProductCard = ({ product }) => {
  const { deleteProduct } = useProductStore();
  const textColor = useColorModeValue("gray.600", "grey.200");
  const bgColor = useColorModeValue("white", "gray.800");
  const toast = useToast();

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
    </Box>
  );
};

export default ProductCard;
