import { UserProfile } from "@/common.types";
import { getUserProjects } from "@/lib/actions";
import ProfilePage from "@/components/ProfilePage";



const Profile = async ({ params: { id } }: { params: { id: string } }) => {
    const result = await getUserProjects(id, 100) as { user: UserProfile };

    if (!result?.user) {
        return (
            <p className="no-result-text">No such user</p>
        );
    }

    return <ProfilePage user={ result?.user } />;
};

export default Profile;