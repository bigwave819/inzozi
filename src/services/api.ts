/**
 * Placeholder API service layer for future NestJS backend integration.
 * Currently returns mocked promises to satisfy UI data requirements.
 */

export interface Feature {
    title: string;
    description: string;
    iconIndex: number;
}

export interface TechStackItem {
    name: string;
    type: string;
}

export const fetchFeatures = async (): Promise<Feature[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return [
        { title: "Bills Management", description: "Efficiently manage and track all government standard payments.", iconIndex: 0 },
        { title: "Payment Tracking", description: "Real-time tracking of transactions securely and transparently.", iconIndex: 1 },
        { title: "Digital Services", description: "Seamless integrations for multiple digital service categories.", iconIndex: 2 },
        { title: "Reporting Analytics", description: "Comprehensive insights and custom reporting for financials.", iconIndex: 3 }
    ];
};

export const fetchTechStack = async (): Promise<TechStackItem[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return [
        { name: "NestJS", type: "Backend Framework" },
        { name: "Prisma ORM", type: "Database Layer" },
        { name: "PostgreSQL", type: "Relational DB" },
        { name: "React Native", type: "Mobile Frontend" },
        { name: "Next.js", type: "Web Frontend" }
    ];
};
