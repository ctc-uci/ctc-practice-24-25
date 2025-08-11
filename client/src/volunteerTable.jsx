import { useState, useEffect } from "react";

export function VolunteerTable(){
    // Pretend this is pulled data from the database
    const [volunteers, setVolunteers] = useState(null)
    
    useEffect(() => {
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
        ])
    }, [])

    return (
        <div className="volunteer-table-container">
            <h2>Volunteer Information</h2>
            <table className="volunteer-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Project</th>
                    </tr>
                </thead>
                <tbody>
                    {volunteers.map((volunteer) => (
                        <tr key={volunteer.id}>
                            <td>{volunteer.name}</td>
                            <td>{volunteer.phone}</td>
                            <td>{volunteer.email}</td>
                            <td>{volunteer.project}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <style>{`
                .volunteer-table-container {
                    padding: 20px;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                
                h2 {
                    color: #333;
                    margin-bottom: 20px;
                    text-align: center;
                }
                
                .volunteer-table {
                    width: 100%;
                    border-collapse: collapse;
                    background: white;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                
                .volunteer-table th {
                    background: #4a90e2;
                    color: white;
                    padding: 15px;
                    text-align: left;
                    font-weight: 600;
                    font-size: 14px;
                }
                
                .volunteer-table td {
                    padding: 15px;
                    border-bottom: 1px solid #eee;
                    font-size: 14px;
                }
                
                .volunteer-table tr:hover {
                    background-color: #f8f9fa;
                }
                
                .volunteer-table tr:last-child td {
                    border-bottom: none;
                }
            `}</style>
        </div>
    )
}