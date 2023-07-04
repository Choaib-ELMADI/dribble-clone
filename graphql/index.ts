export const getUserQuery = `
    query GetUser($email: String!) {
        user(by: { email: $email }) {
            id
            name
            email
            avatarUrl
            description
            githubUrl
            linkedInUrl
        }
    }
`;

export const projectsQuery = `
    query getProjects($category: String, $endcursor: String) {
        projectSearch(first: 8, after: $endcursor, filter: {category: {eq: $category}}) {
        pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
        }
        edges {
            node {
                title
                githubUrl
                description
                liveSiteUrl
                id
                image
                category
                createdBy {
                    id
                    email
                    name
                    avatarUrl
                }
            }
        }
        }
    }
`;

export const getProjectByIdQuery = `
    query GetProjectById($id: ID!) {
        project(by: { id: $id }) {
            id
            title
            description
            image
            liveSiteUrl
            githubUrl
            category
            createdBy {
                id
                name
                email
                avatarUrl
            }
        }
    }
`;

export const getProjectsOfUserQuery = `
    query getUserProjects($id: ID!, $last: Int = 4) {
        user(by: { id: $id }) {
            id
            name
            email
            description
            avatarUrl
            githubUrl
            linkedInUrl
            projects(last: $last) {
                edges {
                node {
                    id
                    title
                    image
                }
                }
            }
        }
    }
`;

export const createUserMutation = `
    mutation CreateUser($input: UserCreateInput!) {
        userCreate(input: $input) {
            user {
                id
                name
                email
                avatarUrl
                description
                githubUrl
                linkedInUrl
            }
        }
    }
`;

export const createProjectMutation = `
	mutation CreateProject($input: ProjectCreateInput!) {
		projectCreate(input: $input) {
			project {
				id
				title
				description
				createdBy {
					email
					name
				}
			}
		}
	}
`;