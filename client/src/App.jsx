import React, { useState, useEffect } from "react";

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
    const [npoData, setNpoData] = useState([]); // NOTE: we store the queried data to use for the table later

    const getData = async () => {
      try {
        const response = await Backend.get(`/js_project_info/npo-info`);
        console.log(response.data);

        setNpoData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
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
                        CTC Project Data 2021-2024
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
                        {npoData.map((npo) => (
                          <Tr key={npo.id}>
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
