
import {useState, useEffect} from "react";
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Backend.get("/");
                setNpoData(response.data);
            } catch (err) {
                console.error("Failed to fetch NPO data:", err);
            }
        };

        fetchData();
    }, []);
    console.log(npoData);
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
                            <Th isNumeric>Start Year</Th>
                            <Th isNumeric>End Year</Th>
                            <Th>Project Leads</Th>
                        </Tr>
                    </Thead>                   
                    <Tbody>
                           {npoData.map((row, index) =>{
                            return(<Tr key={index}>
                                <Td key={`${index} name`}>{row.name}</Td>
                                <Td key={`${index} desc`}>{row.description}</Td>
                                <Td key={`${index} start`} isNumeric>{row.startYear}</Td>
                                <Td key={`${index} end`} isNumeric>{row.endYear}</Td>
                                <Td key={`${index} project`}>{row.projectLeads.join(', ')}</Td>
                            </Tr>);
                            }
                            )
                            
                        }      
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default App;
