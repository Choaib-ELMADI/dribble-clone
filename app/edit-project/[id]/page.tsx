import { redirect } from "next/navigation";

import ProjectForm from "@/components/ProjectForm";
import Modal from "@/components/Modal";
import { getCurrentUser } from "@/lib/session";
import { getProjectDetails } from "@/lib/actions";
import { ProjectInterface } from "@/common.types";



const EditProject = async ({ params:{ id } }: { params:{ id: string } }) => {
    const session = await getCurrentUser();

    if (!session?.user) redirect('/'); 

    const result = await getProjectDetails(id) as { project?: ProjectInterface };

    return (
        <Modal>
            <h3 className="modal-head-text">Edit Project</h3>

            <ProjectForm 
                type='edit' 
                session={ session }
                project={ result?.project }
            />
        </Modal>
    );
};

export default EditProject;