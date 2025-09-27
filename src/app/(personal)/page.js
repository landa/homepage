import { Card, Text, Flex, Box, Avatar, Inset, Theme } from "@radix-ui/themes";
import Image from "next/image";

export default function Home() {
    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <Theme appearance="light" className="bg-white rounded-lg">
                    <Card>
                        <Flex direction={{ initial: "column", sm: "row" }} gap={{initial: "0", sm: "5"}}>
                            <Inset side="top" className="md:hidden">
                                <a href="/yafim.jpg" className="block rounded">
                                    <Image src="/yafim.png" alt="Yafim Landa" width={200} height={200} sizes="(min-width: 768px) 200px, 100vw" className="w-full h-auto" />
                                </a>
                            </Inset>
                            <Inset side="left" className="hidden md:block">
                                <a href="/yafim.jpg" className="block rounded">
                                    <Image src="/yafim.png" alt="Yafim Landa" width={200} height={200} sizes="(min-width: 768px) 200px, 100vw" className="w-[200px] h-auto" />
                                </a>
                            </Inset>
                            <Flex direction="column" gap="4" maxWidth="300px">
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
                                    Founder <a href="https://cloudstrat.com" className="emph">@CloudStrat</a>, the best data processing software for small teams.
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
