import { Card, Flex, Theme } from "@radix-ui/themes";

export default function ContentCard({ children, className = "" }) {
    return (
        <Theme appearance="light" className={`bg-white rounded-lg w-full ${className}`}>
            <Card className="w-full">
                <Flex direction="column" gap="4">
                    {children}
                </Flex>
            </Card>
        </Theme>
    );
}

