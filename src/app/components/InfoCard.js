import { Card, Text, Flex, Inset } from "@radix-ui/themes";
import Image from "next/image";

/**
 * A reusable card component with an image and content section
 * @param {Object} props - Component props
 * @param {string} props.imageSrc - Path to the image
 * @param {string} props.imageAlt - Alt text for the image
 * @param {string} [props.imageLink] - Optional link when image is clicked
 * @param {string} props.title - Main title/name
 * @param {string} [props.subtitle] - Optional subtitle (e.g., email)
 * @param {React.ReactNode} props.children - Content to display in the card body
 * @param {string} [props.maxWidth="310px"] - Maximum width of the content section
 */
export default function InfoCard({
    imageSrc,
    imageAlt,
    imageLink,
    title,
    subtitle,
    children,
    maxWidth = "310px",
}) {
    const imageContent = (
        <Image
            src={imageSrc}
            alt={imageAlt}
            width={200}
            height={200}
            sizes="(min-width: 768px) 200px, 100vw"
            className="w-full h-full object-cover object-top"
        />
    );

    const desktopImageContent = (
        <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="200px"
            className="object-cover object-top"
        />
    );

    return (
        <Card className="h-[calc(100svh-4rem-40px)] md:h-auto overflow-visible">
            <Flex
                direction={{ initial: "column", sm: "row" }}
                gap={{ initial: "0", sm: "5" }}
                align="stretch"
                className="h-full"
            >
                {/* Mobile Image - Top */}
                <Inset side="top" className="md:hidden flex-1 min-h-[200px] overflow-hidden">
                    {imageLink ? (
                        <a href={imageLink} className="block h-full rounded">
                            {imageContent}
                        </a>
                    ) : (
                        <div className="block h-full rounded">{imageContent}</div>
                    )}
                </Inset>

                {/* Desktop Image - Left */}
                <Inset side="left" className="hidden md:block relative self-stretch overflow-hidden w-[200px]">
                    {imageLink ? (
                        <a href={imageLink} className="block relative h-full w-full rounded">
                            {desktopImageContent}
                        </a>
                    ) : (
                        <div className="block relative h-full w-full rounded">
                            {desktopImageContent}
                        </div>
                    )}
                </Inset>

                {/* Content Section */}
                <Flex
                    direction="column"
                    gap="4"
                    maxWidth={maxWidth}
                    className="flex-none overflow-y-auto max-h-[calc(100%-200px)] md:flex-none md:overflow-visible md:max-h-none"
                >
                    <Flex direction="row" gap="5">
                        <Flex direction="column" pt="2">
                            <Text weight="bold" size="6">
                                {title}
                            </Text>
                            {subtitle && (
                                <Text size="4" color="gray">
                                    {subtitle}
                                </Text>
                            )}
                        </Flex>
                    </Flex>
                    {children}
                </Flex>
            </Flex>
        </Card>
    );
}

