import {useEffect, useState} from "react";
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

import IntroMessage from "./components/IntroMessage";

const Backend = axios.create({
    baseURL: "http://localhost:3001",
    withCredentials: true,
});

const App = () => {
    const [npoData, setNpoData] = useState([]);

    useEffect(function() {
      const getData = async () => {
        const data = await Backend.get(`/npo-info`);
        setNpoData(data.data)
      };
      getData();
    }, [])

    const setTableRows = () => {
      return npoData.map((npoObject) => {
        return (
        <Tr key={npoObject.id}>
            <Td>{npoObject.name}</Td>
            <Td>{npoObject.description}</Td>
            <Td>{npoObject.start_year}</Td>
            <Td>{npoObject.end_year}</Td>
            <Td>{npoObject.project_leads.join(" ")}</Td>
        </Tr>)
      })
    }

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
                            <Th>NPO NAME</Th>
                            <Th>NPO DESCRIPTION</Th>
                            <Th>START YEAR</Th>
                            <Th>END YEAR</Th>
                            <Th>PROJECT LEADS</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {setTableRows()}
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
