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

import IntroMessage from "./components/IntroMessage";

const Backend = axios.create({
    baseURL: "http://localhost:3001",
    withCredentials: true,
});

const App = () => {
    const [data, setData] = useState([]);

    const getData = async () => {
        const npoProjs = await Backend.get(`/project/npo-projects`);
        setData(npoProjs);
        console.log(npoProjs);
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
                            <Th>Npo Name</Th>
                            <Th>Npo Description</Th>
                            <Th>Start Year</Th>
                            <Th>End Year</Th>
                            <Th>Project Leads</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((info) => (
                            <Tr key={info.id}>
                                <Td>{info.name}</Td>
                                <Td>{info.description}</Td>
                                <Td isNumeric>{info.startYear}</Td>
                                <Td isNumeric>{info.endYear}</Td>
                                <Td>{info.projectLeads.join(", ")}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default App;
