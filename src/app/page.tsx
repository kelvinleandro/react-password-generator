"use client";
import { useState } from "react";
import {
  Center,
  Stack,
  Text,
  Button,
  Input,
  InputRightElement,
  InputGroup,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { CopyIcon, CheckIcon } from "@chakra-ui/icons";
import { useClipboard } from "@chakra-ui/react";

const PRIMARY_COLOR = "#252935";
const SECONDARY_COLOR = "#ffd2a2";
const SECONDARY_COLOR_FOCUS = "#d1a779";

export default function Home() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const { hasCopied, onCopy } = useClipboard(password);

  function generatePassword() {
    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";

    const allChars =
      upperCaseChars + lowerCaseChars + numberChars + specialChars;
    let generatedPassword = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      generatedPassword += allChars[randomIndex];
    }

    setPassword(generatedPassword);
  }

  return (
    <Center h="100vh" bgColor={PRIMARY_COLOR}>
      <Stack spacing={4} direction="column" align="center" px={4} >
        <Text fontSize="2xl" color={SECONDARY_COLOR}>
          GENERATE A{" "}
          <Text fontWeight="bold" as="ins">
            RANDOM PASSWORD
          </Text>
        </Text>

        <Stack direction="row" align="center">
          <Text size="lg" as="b" color={SECONDARY_COLOR}>
            LENGTH:{" "}
          </Text>
          <NumberInput
            defaultValue={8}
            min={6}
            max={20}
            size="sm"
            maxW={24}
            bg="white"
            color={PRIMARY_COLOR}
            onChange={(value) => setLength(parseInt(value))}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Stack>

        <InputGroup size="lg">
          <Input
            variant="filled"
            pr="3em"
            isReadOnly
            value={password}
            _focus={{ bgColor: '#fff' }}
          />
          <InputRightElement mx="0.25em">
            <IconButton
              aria-label="Copy password"
              icon={hasCopied ? <CheckIcon /> : <CopyIcon />}
              onClick={onCopy}
            />
          </InputRightElement>
        </InputGroup>

        <Button
          size="lg"
          colorScheme="blue"
          onClick={generatePassword}
          bgColor={SECONDARY_COLOR}
          color={PRIMARY_COLOR}
          _hover={{ bgColor: SECONDARY_COLOR_FOCUS, color: PRIMARY_COLOR }}
          _focus={{ bgColor: SECONDARY_COLOR_FOCUS, color: PRIMARY_COLOR }}
        >
          GENERATE
        </Button>
      </Stack>
    </Center>
  );
}
