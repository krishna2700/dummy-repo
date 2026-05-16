import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Container,
  Divider,
  Heading,
  HStack,
  Input,
  Select,
  SimpleGrid,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useState } from "react";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish (Español)" },
  { code: "fr", name: "French (Français)" },
  { code: "de", name: "German (Deutsch)" },
  { code: "zh", name: "Chinese Simplified (中文)" },
  { code: "ja", name: "Japanese (日本語)" },
  { code: "pt", name: "Portuguese (Português)" },
  { code: "hi", name: "Hindi (हिन्दी)" },
  { code: "ar", name: "Arabic (العربية)" },
  { code: "ru", name: "Russian (Русский)" },
  { code: "ko", name: "Korean (한국어)" },
  { code: "it", name: "Italian (Italiano)" },
  { code: "nl", name: "Dutch (Nederlands)" },
  { code: "tr", name: "Turkish (Türkçe)" },
  { code: "pl", name: "Polish (Polski)" },
];

const defaultForm = {
  name: "",
  description: "",
  features: "",
  techStack: "",
  repoUrl: "",
  license: "MIT",
};

const ReadmePage = () => {
  const [form, setForm] = useState(defaultForm);
  const [mode, setMode] = useState("single"); // "single" | "bulk" | "all"
  const [selectedLang, setSelectedLang] = useState("en");
  const [bulkLangs, setBulkLangs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [activeResult, setActiveResult] = useState(0);

  const toast = useToast();
  const cardBg = useColorModeValue("white", "gray.800");
  const codeBg = useColorModeValue("gray.50", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const buildPayload = () => ({
    name: form.name.trim(),
    description: form.description.trim(),
    features: form.features.trim() || undefined,
    techStack: form.techStack.trim() || undefined,
    repoUrl: form.repoUrl.trim() || undefined,
    license: form.license || "MIT",
  });

  const handleGenerate = async () => {
    if (!form.name.trim()) {
      toast({ title: "Project name is required", status: "error", isClosable: true });
      return;
    }
    if (!form.description.trim()) {
      toast({ title: "Description is required", status: "error", isClosable: true });
      return;
    }
    if (mode === "bulk" && bulkLangs.length === 0) {
      toast({ title: "Select at least one language", status: "warning", isClosable: true });
      return;
    }

    setLoading(true);
    setResults([]);
    setActiveResult(0);

    try {
      let endpoint = "/api/readme/generate";
      let payload = buildPayload();

      if (mode === "single") {
        payload.language = selectedLang;
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.error || "Generation failed");
        setResults([data]);
      } else if (mode === "bulk") {
        payload.languages = bulkLangs;
        const res = await fetch("/api/readme/generate/bulk", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.error || "Generation failed");
        setResults(data.results);
      } else {
        const res = await fetch("/api/readme/generate/all", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.error || "Generation failed");
        setResults(data.readmes);
      }

      toast({
        title: "README generated!",
        description: `Successfully created ${mode === "single" ? 1 : mode === "bulk" ? bulkLangs.length : 15} file(s).`,
        status: "success",
        isClosable: true,
      });
    } catch (err) {
      toast({ title: "Error", description: err.message, status: "error", isClosable: true });
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = (content, filename) => {
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAll = () => {
    results.forEach((r) => {
      const content = r.content;
      const filename = r.filename;
      setTimeout(() => downloadFile(content, filename), 100);
    });
    toast({ title: `Downloading ${results.length} file(s)`, status: "info", isClosable: true });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({ title: "Copied to clipboard!", status: "success", duration: 1500, isClosable: true });
    });
  };

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <VStack spacing={2} textAlign="center">
          <Heading
            size="xl"
            bgGradient="linear(to-r, purple.400, pink.500)"
            bgClip="text"
          >
            Auto README Generator
          </Heading>
          <Text color="gray.500" fontSize="md">
            Generate professional README files in 15 languages with one click
          </Text>
        </VStack>

        {/* Form Card */}
        <Box bg={cardBg} p={8} rounded="xl" shadow="md" border="1px" borderColor={borderColor}>
          <VStack spacing={5} align="stretch">
            <Heading size="md" mb={1}>Project Details</Heading>
            <Divider />

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <Box>
                <Text mb={1} fontWeight="semibold" fontSize="sm">Project Name *</Text>
                <Input
                  name="name"
                  placeholder="e.g. My Awesome App"
                  value={form.name}
                  onChange={handleChange}
                  focusBorderColor="purple.400"
                />
              </Box>
              <Box>
                <Text mb={1} fontWeight="semibold" fontSize="sm">License</Text>
                <Select
                  name="license"
                  value={form.license}
                  onChange={handleChange}
                  focusBorderColor="purple.400"
                >
                  <option value="MIT">MIT</option>
                  <option value="Apache 2.0">Apache 2.0</option>
                  <option value="GPL-3.0">GPL-3.0</option>
                  <option value="BSD-3-Clause">BSD-3-Clause</option>
                  <option value="ISC">ISC</option>
                  <option value="Unlicense">Unlicense</option>
                </Select>
              </Box>
            </SimpleGrid>

            <Box>
              <Text mb={1} fontWeight="semibold" fontSize="sm">Description *</Text>
              <Textarea
                name="description"
                placeholder="A brief description of what your project does..."
                value={form.description}
                onChange={handleChange}
                rows={3}
                focusBorderColor="purple.400"
              />
            </Box>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <Box>
                <Text mb={1} fontWeight="semibold" fontSize="sm">
                  Features <Text as="span" color="gray.400">(comma-separated)</Text>
                </Text>
                <Input
                  name="features"
                  placeholder="e.g. Fast, Lightweight, Open source"
                  value={form.features}
                  onChange={handleChange}
                  focusBorderColor="purple.400"
                />
              </Box>
              <Box>
                <Text mb={1} fontWeight="semibold" fontSize="sm">
                  Tech Stack <Text as="span" color="gray.400">(comma-separated)</Text>
                </Text>
                <Input
                  name="techStack"
                  placeholder="e.g. React, Node.js, MongoDB"
                  value={form.techStack}
                  onChange={handleChange}
                  focusBorderColor="purple.400"
                />
              </Box>
            </SimpleGrid>

            <Box>
              <Text mb={1} fontWeight="semibold" fontSize="sm">Repository URL</Text>
              <Input
                name="repoUrl"
                placeholder="https://github.com/username/repo"
                value={form.repoUrl}
                onChange={handleChange}
                focusBorderColor="purple.400"
              />
            </Box>

            <Divider />

            {/* Generation Mode Tabs */}
            <Box>
              <Text mb={3} fontWeight="semibold" fontSize="sm">Generation Mode</Text>
              <Tabs
                variant="soft-rounded"
                colorScheme="purple"
                onChange={(i) => setMode(["single", "bulk", "all"][i])}
              >
                <TabList mb={4}>
                  <Tab>Single Language</Tab>
                  <Tab>Multiple Languages</Tab>
                  <Tab>All 15 Languages</Tab>
                </TabList>

                <TabPanels>
                  {/* Single */}
                  <TabPanel px={0}>
                    <Box>
                      <Text mb={2} fontSize="sm" color="gray.500">
                        Pick one language for your README.
                      </Text>
                      <Select
                        value={selectedLang}
                        onChange={(e) => setSelectedLang(e.target.value)}
                        focusBorderColor="purple.400"
                        maxW="320px"
                      >
                        {LANGUAGES.map((l) => (
                          <option key={l.code} value={l.code}>{l.name}</option>
                        ))}
                      </Select>
                    </Box>
                  </TabPanel>

                  {/* Bulk */}
                  <TabPanel px={0}>
                    <Text mb={3} fontSize="sm" color="gray.500">
                      Select multiple languages to generate simultaneously.
                    </Text>
                    <CheckboxGroup
                      colorScheme="purple"
                      value={bulkLangs}
                      onChange={(vals) => setBulkLangs(vals)}
                    >
                      <Wrap spacing={3}>
                        {LANGUAGES.map((l) => (
                          <WrapItem key={l.code}>
                            <Checkbox value={l.code}>{l.name}</Checkbox>
                          </WrapItem>
                        ))}
                      </Wrap>
                    </CheckboxGroup>
                    {bulkLangs.length > 0 && (
                      <Text mt={3} fontSize="sm" color="purple.400" fontWeight="semibold">
                        {bulkLangs.length} language(s) selected
                      </Text>
                    )}
                  </TabPanel>

                  {/* All */}
                  <TabPanel px={0}>
                    <Text fontSize="sm" color="gray.500">
                      Generates README files in all 15 supported languages at once — English, Spanish,
                      French, German, Chinese, Japanese, Portuguese, Hindi, Arabic, Russian, Korean,
                      Italian, Dutch, Turkish, and Polish.
                    </Text>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>

            {/* Generate Button */}
            <Button
              size="lg"
              colorScheme="purple"
              onClick={handleGenerate}
              isLoading={loading}
              loadingText="Generating..."
              leftIcon={loading ? <Spinner size="sm" /> : undefined}
              w="full"
              mt={2}
            >
              Generate README
            </Button>
          </VStack>
        </Box>

        {/* Results */}
        {results.length > 0 && (
          <Box bg={cardBg} p={8} rounded="xl" shadow="md" border="1px" borderColor={borderColor}>
            <HStack justify="space-between" mb={4} flexWrap="wrap" gap={2}>
              <Heading size="md">
                Generated Files{" "}
                <Tag colorScheme="purple" ml={2}>{results.length}</Tag>
              </Heading>
              <HStack spacing={2}>
                {results.length > 1 && (
                  <Button size="sm" colorScheme="purple" variant="outline" onClick={downloadAll}>
                    Download All
                  </Button>
                )}
              </HStack>
            </HStack>

            {/* Language selector tabs for results */}
            {results.length > 1 && (
              <Wrap spacing={2} mb={4}>
                {results.map((r, idx) => (
                  <WrapItem key={r.filename}>
                    <Button
                      size="xs"
                      colorScheme={activeResult === idx ? "purple" : "gray"}
                      variant={activeResult === idx ? "solid" : "outline"}
                      onClick={() => setActiveResult(idx)}
                    >
                      {r.language.code.toUpperCase()}
                    </Button>
                  </WrapItem>
                ))}
              </Wrap>
            )}

            {results[activeResult] && (
              <Box>
                <HStack justify="space-between" mb={3} flexWrap="wrap" gap={2}>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold" fontSize="md">
                      {results[activeResult].language.name}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {results[activeResult].filename} &bull;{" "}
                      {results[activeResult].lineCount} lines &bull;{" "}
                      {results[activeResult].characterCount} chars
                    </Text>
                  </VStack>
                  <HStack spacing={2}>
                    <Button
                      size="sm"
                      colorScheme="gray"
                      variant="outline"
                      onClick={() => copyToClipboard(results[activeResult].content)}
                    >
                      Copy
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="purple"
                      onClick={() =>
                        downloadFile(results[activeResult].content, results[activeResult].filename)
                      }
                    >
                      Download
                    </Button>
                  </HStack>
                </HStack>

                <Box
                  bg={codeBg}
                  p={5}
                  rounded="lg"
                  border="1px"
                  borderColor={borderColor}
                  maxH="480px"
                  overflowY="auto"
                  dir={results[activeResult].language.direction || "ltr"}
                >
                  <Text
                    as="pre"
                    fontFamily="mono"
                    fontSize="sm"
                    whiteSpace="pre-wrap"
                    wordBreak="break-word"
                  >
                    {results[activeResult].content}
                  </Text>
                </Box>
              </Box>
            )}
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default ReadmePage;
