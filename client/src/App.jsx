import { useState } from "react";
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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IntroMessage from "./components/IntroMessage";
import { VolunteerTable } from "./volunteerTable";

const Backend = axios.create({
    baseURL: "http://localhost:3001",
    withCredentials: true,
});

const App = () => {
    const [projects, setProjects] = useState([]);

    const getData = async () => {
        const data = await Backend.get(`/projectInfo`);
        setProjects(data.data);
        console.log(data.data);
    };

    getData();

    const NPOContent = () => (
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
                        {projects.map((project) => (
                            <Tr key={project.id}>
                                <Td>{project.name}</Td>
                                <Td>{project.description}</Td>
                                <Td isNumeric>{project.startYear}</Td>
                                <Td isNumeric>{project.endYear}</Td>
                                <Td>{project.projectLeads}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );

    const VolunteerContent = () => (
        <Box
            display={"flex"}
            flexDirection={"column"}
            maxWidth={1400}
            marginX={"auto"}
        >
            <IntroMessage />
            <VolunteerTable />
        </Box>
    );

    return (
        <Router>
            <Routes>
                <Route path="/" element={<NPOContent />} />
                <Route path="/volunteers" element={<VolunteerContent />} />
            </Routes>
        </Router>
    );
};

export default App;
