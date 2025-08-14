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
    const [npoData, setNpoData] = useState();
    const [isLoaded, setIsLoaded] = useState();

    const getData = async () => {
        const allNpoInfo = await Backend.get(`projectInfo/allProjectData`);
        console.log(allNpoInfo.data);
        setNpoData(allNpoInfo.data);
        setIsLoaded(true);
    };

    useEffect(() => {
        !isLoaded && getData();
    }, [isLoaded]);

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
                            <Th isNumeric>START YEAR</Th>
                            <Th isNumeric>END YEAR</Th>
                            <Th>PROJECT LEADS</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {npoData &&
                            npoData.map((npo) => {
                                return (
                                    <Tr key={npo.id}>
                                        <Td>{npo.npoName}</Td>
                                        <Td>{npo.description}</Td>
                                        <Td>{npo.startYear}</Td>
                                        <Td>{npo.endYear}</Td>
                                        <Td>{npo.leadName}</Td>
                                    </Tr>
                                );
                            })}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default App;
