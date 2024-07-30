import { useEffect, useState } from "react";
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

const tableCaption = "CTC NPO Information";
const tableHeaders = [
    { key: "npoName", text: "NPO Name" },
    { key: "npoDescription", text: "NPO Description" },
    { key: "startYear", text: "Start Year" },
    { key: "endYear", text: "End Year" },
    { key: "projectLeads", text: "Project Leads" },
];

const generateTableHeaders = (headers) => {
    return headers.map((header) => {
        return <Th key={header.key}>{header.text}</Th>;
    });
};

const App = () => {
    const [npoData, setNpoData] = useState([]);
    const getData = async () => {
        const data = await Backend.get("/projects/npo");
        setNpoData(data.data);
    };
    useEffect(() => {
        getData();
        console.log(npoData);
    });

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
                    <TableCaption>{tableCaption}</TableCaption>
                    <Thead>
                        <Tr>{generateTableHeaders(tableHeaders)}</Tr>
                    </Thead>
                    <Tbody>
                        {npoData &&
                            npoData.map((item, index) => (
                                <Tr key={index}>
                                    <Td>{item.name}</Td>
                                    <Td>{item.description}</Td>
                                    <Td>{item.startYear}</Td>
                                    <Td>{item.endYear}</Td>
                                    <Td>{item.projectLeads.join(", ")}</Td>
                                </Tr>
                            ))}
                    </Tbody>
                    <Tfoot>
                        <Tr>{generateTableHeaders(tableHeaders)}</Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default App;
