import { Text, Theme } from "@radix-ui/themes";
import Profile from "@/app/components/Profile";
import InfoCard from "@/app/components/InfoCard";

export default function Home() {
    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen p-8">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <Theme appearance="light" className="bg-white rounded-lg">
                    <InfoCard
                        imageSrc="/yafim.png"
                        imageAlt="Yafim Landa"
                        imageLink="/yafim.jpg"
                        title="Yafim Landa"
                        subtitle={
                            <a href="mailto:yafim@cloudstrat.com" className="emph">
                                yafim@cloudstrat.com
                            </a>
                        }
                    >
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
                    </InfoCard>
                </Theme>
            </main>
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
        </div>
    );
}
