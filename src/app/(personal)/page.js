import { Card, Text, Flex, Box, Avatar, Inset, Theme } from "@radix-ui/themes";
import Image from "next/image";

export default function Home() {
    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen p-8">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <Theme appearance="light" className="bg-white rounded-lg">
                    <Card className="h-[calc(100svh-4rem-40px)] md:h-auto overflow-visible">
                        <Flex
                            direction={{ initial: "column", sm: "row" }}
                            gap={{ initial: "0", sm: "5" }}
                            align="stretch"
                            className="h-full"
                        >
                            <Inset side="top" className="md:hidden flex-1 min-h-[200px] overflow-hidden">
                                <a href="/yafim.jpg" className="block h-full rounded">
                                    <Image
                                        src="/yafim.png"
                                        alt="Yafim Landa"
                                        width={200}
                                        height={200}
                                        sizes="(min-width: 768px) 200px, 100vw"
                                        className="w-full h-full object-cover object-top"
                                    />
                                </a>
                            </Inset>
                            <Inset side="left" className="hidden md:block relative self-stretch overflow-hidden w-[200px]">
                                <a href="/yafim.jpg" className="block relative h-full w-full rounded">
                                    <Image
                                        src="/yafim.png"
                                        alt="Yafim Landa"
                                        fill
                                        sizes="200px"
                                        className="object-cover object-top"
                                    />
                                </a>
                            </Inset>
                            <Flex direction="column" gap="4" maxWidth="310px" className="flex-none overflow-y-auto max-h-[calc(100%-200px)] md:flex-none md:overflow-visible md:max-h-none">
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
                                    <a
                                        href="https://tech.facebook.com/reality-labs/"
                                        className="emph"
                                    >
                                        @Meta
                                    </a>
                                    , and a trader at{" "}
                                    <a href="https://www.goldmansachs.com/what-we-do/ficc-and-equities" className="emph">
                                        @Goldman Sachs
                                    </a>
                                    .
                                </Text>
                            </Flex>
                        </Flex>
                    </Card>
                </Theme>
            </main>
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
        </div>
    );
}
