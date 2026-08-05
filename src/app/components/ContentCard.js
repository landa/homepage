import { Card, Flex, Theme } from "@radix-ui/themes";

/**
 * A generic reusable card component with an image and content section
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.image - Image component to display (mobile: top, desktop: left)
 * @param {React.ReactNode} props.children - Content to display in the card body
 */
export default function ContentCard({ image, children }) {
    return (
        <Theme appearance="light" className="bg-white rounded-lg w-full">
            <Card className="!p-0 overflow-hidden">
                {/*
                  Use Tailwind breakpoints only — Radix md is 1024px while
                  Tailwind md is 768px, and mixing them collapsed the image
                  in the range between.
                */}
                <div className="flex h-full flex-col md:flex-row">
                    {image && (
                        <div className="relative h-[280px] w-full shrink-0 overflow-hidden md:h-auto md:w-[200px] md:self-stretch">
                            {image}
                        </div>
                    )}

                    <Flex
                        direction="column"
                        gap="4"
                        className="bg-white px-4 py-3 md:w-0 md:grow md:px-5 md:py-4"
                    >
                        {children}
                    </Flex>
                </div>
            </Card>
        </Theme>
    );
}
