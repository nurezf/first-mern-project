import { useEffect } from "react";
import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product.js";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log(products);

  return (
    <Container maxW="container.x1" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400,blue.500)"}
          bgClip={"text"}
        >
          current products 🚀
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w={"full"}>
          {products.map((product) => (
            <Link to={`/products/${product._id}`} key={product._id}>
              <VStack
                spacing={4}
                p={5}
                borderWidth={1}
                borderRadius="lg"
                boxShadow="md"
                _hover={{ boxShadow: "lg" }}
              >
                <img src={product.image} alt={product.name} width="100%" />
                <Text fontSize="xl" fontWeight="bold">
                  {product.name}
                </Text>
                <Text fontSize="lg" color="gray.500">
                  ${product.price}
                </Text>
              </VStack>
            </Link>
          ))}
        </SimpleGrid>

        {!products && (
          <>
            <Text
              fontSize="xl"
              textAlign={"center"}
              fontWeight="bold"
              color="gray.500"
            >
              No products found 😢{" "}
              <Link to={"/create"}>
                <Text
                  as="span"
                  color="blue.500"
                  _hover={{ textDecoration: "underline" }}
                >
                  Create a product
                </Text>
              </Link>
            </Text>
          </>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
