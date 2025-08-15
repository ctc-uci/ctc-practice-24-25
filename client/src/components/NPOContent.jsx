import { useEffect, useState } from "react";
import {
    Box,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import axios from "axios";

import IntroMessage from "./IntroMessage";

const Backend = axios.create({
    baseURL: "http://localhost:3001",
    withCredentials: true,
});

export function NPOContent() {
    const [data, setData] = useState([]);

    const getData = async () => {
        const res = await Backend.get(`/`);
        setData(res.data);
        console.log(res.data);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            maxWidth={1400}
            marginX={"auto"}
        >
            <IntroMessage />

            <TableContainer>
                <Table variant="simple">
                    <TableCaption>CTC NPO Information</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>NPO NAME</Th>
                            <Th>NPO DESCRIPTION</Th>
                            <Th>START YEAR</Th>
                            <Th>END YEAR</Th>
                            <Th>PROJECT LEADS</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((project) => (
                            <Tr key={project.id}>
                                <Td>{project.name}</Td>
                                <Td>{project.description}</Td>
                                <Td>{project.startYear}</Td>
                                <Td>{project.endYear}</Td>
                                <Td>{project.projectLeads.join(", ")}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
}
