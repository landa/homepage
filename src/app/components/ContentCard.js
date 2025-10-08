import { Card, Flex, Inset, Theme } from "@radix-ui/themes";

/**
 * A generic reusable card component with an image and content section
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.image - Image component to display (mobile: top, desktop: left)
 * @param {React.ReactNode} props.children - Content to display in the card body
 * @param {string} [props.maxWidth="310px"] - Maximum width of the content section
 */
export default function ContentCard({ image, children }) {
    return (
        <Theme appearance="light" className="bg-white rounded-lg w-full">
            <Card className="max-h-[600px] md:h-auto overflow-visible">
                <Flex
                    direction={{ initial: "column", sm: "row" }}
                    gap={{ initial: "0", sm: "5" }}
                    align="stretch"
                    className="h-full shrink-0"
                >
                    {/* Mobile Image - Top */}
                    {image && (
                        <Inset
                            side="top"
                            className="md:hidden flex-1 min-h-[200px] overflow-hidden shrink-0"
                        >
                            {image}
                        </Inset>
                    )}

                    {/* Desktop Image - Left */}
                    {image && (
                        <Inset
                            side="left"
                            className="hidden md:block relative self-stretch overflow-hidden w-[200px] shrink-0"
                        >
                            {image}
                        </Inset>
                    )}

                    {/* Content Section */}
                    <Flex
                        direction="column"
                        gap="4"
                        className="overflow-y-auto md:overflow-visible md:max-h-none bg-white z-10 px-3 pb-1 md:px-0 rounded-lg md:w-0 md:grow"
                    >
                        {children}
                    </Flex>
                </Flex>
            </Card>
        </Theme>
    );
}
