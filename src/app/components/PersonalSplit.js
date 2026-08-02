import AboutCard from "@/app/components/AboutCard";
import BlogPanel from "@/app/components/BlogPanel";

/** Matches the previous ColumnLayout about column sizing. */
const columnClass = "w-[90vw] max-w-[600px] min-w-[320px]";

export default function PersonalSplit({ posts = [] }) {
    return (
        <main className="min-h-screen px-0 py-8 md:py-12">
            <div className="mx-auto flex w-full flex-col items-center gap-8">
                <section className={columnClass}>
                    <AboutCard />
                </section>

                <section className={columnClass}>
                    <BlogPanel posts={posts} />
                </section>
            </div>
        </main>
    );
}
