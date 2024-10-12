'use client'
import React, { useEffect, useState } from 'react';

interface Application {
    id: number;
    name: string;
    status: string;
}

const ApplicationsPage: React.FC = () => {
    const [applications, setApplications] = useState<Application[]>([]);

    useEffect(() => {
        // Fetch applications from an API or database
        const fetchApplications = async () => {
            const response = await fetch('/api/applications');
            const data = await response.json();
            setApplications(data);
        };

        fetchApplications();
    }, []);

    return (
        <div>
            <h1>Applications</h1>
            <ul>
                {applications.map(application => (
                    <li key={application.id}>
                        <h2>{application.name}</h2>
                        <p>Status: {application.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ApplicationsPage;