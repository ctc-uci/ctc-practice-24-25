import { useEffect, useState } from "react";
import {
    Box,
    Heading,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";

import IntroMessage from "./IntroMessage";

export function VolunteerTable() {
    // Pretend this is pulled data from the database
    const [volunteers, setVolunteers] = useState([]);

    useEffect(() => {
        setVolunteers([
            {
                id: 1,
                name: "Rumi",
                phone: "(555) 010-1001",
                email: "rumi@huntrix.com",
                project: "FPH",
            },
            {
                id: 2,
                name: "Mira",
                phone: "(555) 010-1002",
                email: "mira@huntrix.com",
                project: "AISS",
            },
            {
                id: 3,
                name: "Zoey",
                phone: "(555) 010-1003",
                email: "zoey@huntrix.com",
                project: "S2T",
            },
            {
                id: 4,
                name: "Jinu",
                phone: "(555) 010-1004",
                email: "jinu@sajaboys.com",
                project: "S2T",
            },
            {
                id: 5,
                name: "Celine",
                phone: "(555) 010-1005",
                email: "celine@sunlightsisters.com",
                project: "AISS",
            },
            {
                id: 6,
                name: "Bobby",
                phone: "(555) 010-1006",
                email: "bobby@huntrix.com",
                project: "FPH",
            },
        ]);
    }, []);

    return (
        <Box
            p={5}
            maxW="1200px"
            mx="auto"
        >
            <Heading
                as="h2"
                size="lg"
                mb={5}
                textAlign="center"
                color="gray.700"
            >
                Volunteer Information
            </Heading>

            <TableContainer>
                <Table
                    variant="simple"
                    size="md"
                >
                    <Thead>
                        <Tr>
                            <Th
                                bg="blue.500"
                                color="white"
                                fontSize="sm"
                                fontWeight="semibold"
                                px={4}
                                py={4}
                            >
                                Name
                            </Th>
                            <Th
                                bg="blue.500"
                                color="white"
                                fontSize="sm"
                                fontWeight="semibold"
                                px={4}
                                py={4}
                            >
                                Phone Number
                            </Th>
                            <Th
                                bg="blue.500"
                                color="white"
                                fontSize="sm"
                                fontWeight="semibold"
                                px={4}
                                py={4}
                            >
                                Email
                            </Th>
                            <Th
                                bg="blue.500"
                                color="white"
                                fontSize="sm"
                                fontWeight="semibold"
                                px={4}
                                py={4}
                            >
                                Project
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {volunteers.map((volunteer) => (
                            <Tr
                                key={volunteer.id}
                                _hover={{ bg: "gray.50" }}
                                transition="background-color 0.2s"
                            >
                                <Td
                                    px={4}
                                    py={4}
                                    fontSize="sm"
                                >
                                    {volunteer.name}
                                </Td>
                                <Td
                                    px={4}
                                    py={4}
                                    fontSize="sm"
                                >
                                    {volunteer.phone}
                                </Td>
                                <Td
                                    px={4}
                                    py={4}
                                    fontSize="sm"
                                >
                                    {volunteer.email}
                                </Td>
                                <Td
                                    px={4}
                                    py={4}
                                    fontSize="sm"
                                >
                                    {volunteer.project}
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export function VolunteerContent() {
    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            maxWidth={1400}
            marginX={"auto"}
        >
            <IntroMessage />
            <VolunteerTable />
        </Box>
    );
}
