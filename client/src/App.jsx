import React, { useEffect, useState } from "react";
import {
    Box,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import axios from "axios";

import IntroMessage from "./components/IntroMessage";

const Backend = axios.create({
    baseURL: "http://localhost:3001",
    withCredentials: true,
});

const App = () => {

    const [data, setData] = useState([]);

    const getData = async () => {
        const npo_projects = await Backend.get(`/project/npo-projects`);
        setData(npo_projects.data);
        console.log(npo_projects.data);
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
                    <TableCaption>
                        CTC NPO Information
                    </TableCaption>
                    <Thead>
                        <Tr>
                            <Th>NPO Name</Th>
                            <Th>NPO Description</Th>
                            <Th>Start Year</Th>
                            <Th>End Year</Th>
                            <Th>Project Leads</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            data.map((row) => (
                                <Tr key={row.id}>
                                    <Td>{row.name}</Td>
                                    <Td>{row.description}</Td>
                                    <Td isNumeric>{row.startYear}</Td>
                                    <Td isNumeric>{row.endYear}</Td>
                                    <Td >{row.projectLeads.join(', ')}</Td>
                                </Tr>
                            ))
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default App;
