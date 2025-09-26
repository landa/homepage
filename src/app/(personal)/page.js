import { Card, Text, Flex, Box, Avatar, Inset, Theme } from "@radix-ui/themes";
import Image from "next/image";

export default function Home() {
    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <Theme appearance="light" className="bg-stone-100 rounded-lg">
                    <Card>
                        <Flex direction="row" gap="5">
                            <Inset side="left">
                                <a href="/yafim.jpg" className="block rounded">
                                    <Image width="200" height="200" src="/yafim.png" alt="Yafim Landa" />
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
