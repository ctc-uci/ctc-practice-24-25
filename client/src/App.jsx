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
import { useEffect, useState } from "react";

const Backend = axios.create({
    baseURL: "http://localhost:3001",
    withCredentials: true,
});

const App = () => {
    const [data, setData] = useState([]);
    const getData = async () => {
        const data = await Backend.get(`/`);
        setData(data.data)
        console.log(data.data);
    };

    useEffect(()=>{
        getData();
    },[])

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
                        {data.map((npoProject) => (
                            <Tr key={npoProject.id}>
                                <Td>{npoProject.name}</Td>
                                <Td>{npoProject.description}</Td>
                                <Td>{npoProject.startYear}</Td>
                                <Td>{npoProject.endYear}</Td>
                                <Td>{npoProject.projectLeads.join(", ")}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default App;
