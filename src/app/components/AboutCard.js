import { Text, Flex } from "@radix-ui/themes";
import ContentCard from "@/app/components/ContentCard";
import Image from "next/image";

export default function AboutCard() {
    return (
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
                        <a href="mailto:landa@alum.mit.edu" className="emph">
                            landa@alum.mit.edu
                        </a>
                    </Text>
                </Flex>
            </Flex>
            <Text size="4" color="gray">
                Founder of CloudStrat, an agentic data platform for institutional traders.
            </Text>
            <Text size="4" color="gray">
                Previously: robotics researcher{" "}
                <a href="http://csail.mit.edu" className="emph">
                    @MIT
                </a>
                , AR/VR software engineer{" "}
                <a href="https://tech.facebook.com/reality-labs/" className="emph">
                    @Meta
                </a>
                , energy trader{" "}
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
}
