"use client";

import { useState, useEffect } from "react";
import { fetchFeatures, fetchTechStack, Feature, TechStackItem } from "@/services/api";

export function usePortfolioData() {
    const [features, setFeatures] = useState<Feature[]>([]);
    const [techStack, setTechStack] = useState<TechStackItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        const loadData = async () => {
            try {
                const [featuresData, techData] = await Promise.all([
                    fetchFeatures(),
                    fetchTechStack()
                ]);
                if (mounted) {
                    setFeatures(featuresData);
                    setTechStack(techData);
                }
            } catch (error) {
                console.error("Failed to load portfolio data", error);
            } finally {
                if (mounted) {
                    setIsLoading(false);
                }
            }
        };

        loadData();

        return () => {
            mounted = false;
        };
    }, []);

    return { features, techStack, isLoading };
}
