import React from "react";
import {
  Container,
  Flex,
  Text,
  HStack,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
import { IoSunnyOutline, IoMoon } from "react-icons/io5";

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400,blue.500)"}
          bgClip={"text"}
        >
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>
        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <CiSquarePlus fontSize={"30px"} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode == "light" ? (
              <IoMoon fontSize={"20px"} />
            ) : (
              <IoSunnyOutline fontSize={"20px"} />
            )}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default NavBar;
