"use client";

import ColumnLayout from "@/app/components/ColumnLayout";
import { Text, Flex } from "@radix-ui/themes";
import ContentCard from "@/app/components/ContentCard";
import Image from "next/image";

// Personal/Home column content
const HomeColumn = () => (
    <ContentCard
        image={
            <a href="/yafim.jpg" className="block h-full w-full rounded">
                <Image
                    src="/yafim.png"
                    alt="Yafim Landa"
                    fill
                    priority
                    sizes="(min-width: 768px) 200px, 100vw"
                    className="object-cover object-top"
                />
            </a>
        }
    >
        <Flex direction="row" gap="5">
            <Flex direction="column" pt="2">
                <Text weight="bold" size="6">
                    Yafim Landa
                </Text>
                <Text size="4" color="gray">
                    <a href="mailto:yafim@cloudstrat.com" className="emph">
                        yafim@cloudstrat.com
                    </a>
                </Text>
            </Flex>
        </Flex>
        <Text size="4" color="gray">
            Founder{" "}
            <a href="https://cloudstrat.com" className="emph">
                @CloudStrat
            </a>
            , the best data processing software for small teams.
        </Text>
        <Text size="4" color="gray">
            Previously a researcher in robotics at{" "}
            <a href="http://csail.mit.edu" className="emph">
                @MIT
            </a>
            , software engineer at{" "}
            <a href="https://tech.facebook.com/reality-labs/" className="emph">
                @Meta
            </a>
            , and a trader at{" "}
            <a
                href="https://www.goldmansachs.com/what-we-do/ficc-and-equities"
                className="emph"
            >
                @Goldman Sachs
            </a>
            .
        </Text>
    </ContentCard>
);

// Work column content placeholder
const WorkColumn = () => (
    <ContentCard>
        <Flex direction="column" gap="4">
            <Text weight="bold" size="6">
                Work
            </Text>
            <Text size="4" color="gray">
                Work experience and projects coming soon...
            </Text>
        </Flex>
    </ContentCard>
);

// Research column content placeholder
const ResearchColumn = () => (
    <ContentCard>
        <Flex direction="column" gap="4">
            <Text weight="bold" size="6">
                Research
            </Text>
            <Text size="4" color="gray">
                Research publications and papers coming soon...
            </Text>
        </Flex>
    </ContentCard>
);

export default function PersonalLayout({ children }) {
    const columns = [
        {
            path: "/",
            content: <HomeColumn />
        },
    ];

    return <ColumnLayout columns={columns} />;
}

