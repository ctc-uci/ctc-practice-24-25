import { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'

export function VolunteerTable(){
    // Pretend this is pulled data from the database
    const [volunteers, setVolunteers] = useState([])
    
    useEffect(() => {
        console.log("Setting Volunteer Data")
        setVolunteers([
            {
                id: 1,
                name: "Rumi",
                phone: "(555) 010-1001",
                email: "rumi@huntrix.com",
                project: "FPH"
            },
            {
                id: 2,
                name: "Mira",
                phone: "(555) 010-1002",
                email: "mira@huntrix.com",
                project: "AISS"
            },
            {
                id: 3,
                name: "Zoey",
                phone: "(555) 010-1003",
                email: "zoey@huntrix.com",
                project: "S2T"
            },
            {
                id: 4,
                name: "Jinu",
                phone: "(555) 010-1004",
                email: "jinu@sajaboys.com",
                project: "S2T"
            },
            {
                id: 5,
                name: "Celine",
                phone: "(555) 010-1005",
                email: "celine@sunlightsisters.com",
                project: "AISS"
            },
            {
                id: 6,
                name: "Bobby",
                phone: "(555) 010-1006",
                email: "bobby@huntrix.com",
                project: "FPH"
            }
        ]);
    }, [])

    return (
        <div className="volunteer-table-container">
            <h2>Volunteer Information</h2>
            <Table className="volunteer-table">
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Phone Number</Th>
                        <Th>Email</Th>
                        <Th>Project</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {volunteers.map((volunteer) => (
                        <Tr key={volunteer.id}>
                            <Td>{volunteer.name}</Td>
                            <Td>{volunteer.phone}</Td>
                            <Td>{volunteer.email}</Td>
                            <Td>{volunteer.project}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </div>
    )
}