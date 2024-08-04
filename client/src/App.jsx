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
import { useState, useEffect } from "react";

import IntroMessage from "./components/IntroMessage";

const Backend = axios.create({
    baseURL: "http://localhost:3001",
    withCredentials: true,
});

const App = () => {
    const [npoData, setData] = useState([]);

    const getData = async () => {
        const data = await Backend.get(`/`);
        setData(data.data);
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
                        CTC NPO Project Informatiion
                    </TableCaption>
                    <Thead>
                        <Tr>
                            <Th>NPO Name</Th>
                            <Th>NPO Description</Th>
                            <Th isNumeric>Start Year</Th>
                            <Th isNumeric>End Year</Th>
                            <Th>Project Leads</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                    {npoData.map((npo, index) => (
                    <Tr key={index}>
                        <Td>{npo.name}</Td>
                        <Td>{npo.description}</Td>
                        <Td isNumeric>{npo.startYear}</Td>
                        <Td isNumeric>{npo.endYear}</Td>
                        <Td>{npo.projectLeads.join(", ")}</Td>
                    </Tr>
                    ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default App;
