// make get request include npo_id and id
// make it so that the project leads are spaced out by commas

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

    const fetchData = async () => {
        try {
            const response = await Backend.get(`/npo`);
            setData(response.data);
            // console.log(data)
        } catch (error) {
            console.log("Error Fetchng Data:", error);
        }
    };

    useEffect(() => {
        fetchData();
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
                            <Th>NPO Name</Th>
                            <Th>NPO Description</Th>
                            <Th isNumeric>START YEAR</Th>
                            <Th isNumeric>END YEAR</Th>
                            <Th>PROJECT LEADS</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((npo) => (
                            <Tr key={npo.id}>
                                <Td>{npo.name}</Td>
                                <Td>{npo.description}</Td>
                                <Td isNumeric>{npo.startYear}</Td>
                                <Td isNumeric>{npo.endYear}</Td>
                                <Td>{npo.projectLeads}</Td>
                            </Tr>
                        ))}
                        {/* <Tr>
                            <Td>inches</Td>
                            <Td>millimetres (mm)</Td>
                            <Td isNumeric>25.4</Td>
                        </Tr>
                        <Tr>
                            <Td>feet</Td>
                            <Td>centimetres (cm)</Td>
                            <Td isNumeric>30.48</Td>
                        </Tr>
                        <Tr>
                            <Td>yards</Td>
                            <Td>metres (m)</Td>
                            <Td isNumeric>0.91444</Td>
                        </Tr> */}
                    </Tbody>
                    {/* <Tfoot>
                        <Tr>
                            <Th>To convert</Th>
                            <Th>into</Th>
                            <Th isNumeric>multiply by</Th>
                        </Tr>
                    </Tfoot> */}
                </Table>
            </TableContainer>
        </Box>
    );
};

export default App;
