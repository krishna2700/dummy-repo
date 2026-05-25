import { Container, Heading, Text, VStack } from "@chakra-ui/react";

const DashboardPage = () => {
  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={6} alignItems="flex-start">
        <Heading
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
        >
          Dashboard
        </Heading>
        <Text color="gray.500" fontSize="lg">
          Welcome to your dashboard. Manage your products and settings here.
        </Text>
      </VStack>
    </Container>
  );
};

export default DashboardPage;
