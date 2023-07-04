import { ProjectInterface } from "@/common.types";
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



const Home = async () => {
    const data = await fetchAllProjects() as ProjectSearch;

    const projectToDisplay = data?.projectSearch?.edges || [];

    if (projectToDisplay.length === 0) {
        return (
            <section className="flexStart flex-col paddings">
                Categories
                <p className="no-results-text text-center">No projects found, go create some first.</p>
            </section>
        );
    }

    return (
        <section className="flex-start flex-col paddings mb-16">
            <h2>Categories</h2>
            <section className="projects-grid">
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
            <h2>Load more</h2>
        </section>
    );
};

export default Home;