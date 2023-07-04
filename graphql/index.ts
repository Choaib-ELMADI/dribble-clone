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