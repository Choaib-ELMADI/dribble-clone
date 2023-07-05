import { ProjectInterface } from "@/common.types";
import Categories from "@/components/Categories";
import LoadMore from "@/components/LoadMore";
import ProjectCard from "@/components/ProjectCard";
import { fetchAllProjects } from "@/lib/actions";

type ProjectSearch = {
    projectSearch: {
        edges: { node: ProjectInterface }[],
        pageInfo: {
            hasPreviousPage: boolean,
            hasNextPage: boolean,
            startCursor: string,
            endCursor: string,
        }
    }
};

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;



const Home = async ({ searchParams: { category, endcursor }}: { searchParams: { category?: string, endcursor?: string } }) => {
    const data = await fetchAllProjects(category, endcursor) as ProjectSearch;

    const projectToDisplay = data?.projectSearch?.edges || [];

    if (projectToDisplay.length === 0) {
        return (
            <section className="flexStart flex-col paddings gap-8">
                <Categories />
                <p className="no-results-text text-center">No projects found, go create some first.</p>
            </section>
        );
    }

    return (
        <section className="flexStart flex-col paddings mb-16">
            <Categories />
            <section className="projects-grid mb-8">
                {
                    projectToDisplay.map(({ node }: { node: ProjectInterface }) => (
                        <ProjectCard
                            key={ node?.id }
                            id={ node?.id }
                            image={ node?.image }
                            title={ node?.title }
                            name={ node?.createdBy?.name }
                            avatarUrl={ node?.createdBy?.avatarUrl }
                            userId={ node?.createdBy?.id }
                        />
                    ))
                }
            </section>
            <LoadMore 
                startCursor={ data?.projectSearch?.pageInfo?.startCursor } 
                endCursor={ data?.projectSearch?.pageInfo?.endCursor } 
                hasPreviousPage={ data?.projectSearch?.pageInfo?.hasPreviousPage }
                hasNextPage={ data?.projectSearch?.pageInfo?.hasNextPage }
            />
        </section>
    );
};

export default Home;