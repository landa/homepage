import { Text, Flex, Theme } from "@radix-ui/themes";
import Profile from "@/app/components/Profile";
import ContentCard from "@/app/components/ContentCard";
import Image from "next/image";

export default function Home() {
    return (
        <main>
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
        </main>
    );
}
