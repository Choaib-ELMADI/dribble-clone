'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { deleteProject, fetchToken } from "@/lib/actions";



const ProjectActions = ({ projectId }: { projectId: string }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();
    
    const handleDeleteProject = async () => {
        setIsDeleting(true);

        const { token } = await fetchToken();

        try {
            await deleteProject(projectId, token);
            router.push('/');
        } catch (error) {
            console.log(error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <Link 
                href={ `/edit-project/${ projectId }` }
                className="flexCenter edit-action_btn"
            >
                <Image 
                    src='/pencile.svg'
                    width={ 20 }
                    height={ 20 }
                    alt=''
                    draggable='false'
                />
            </Link>
            <button 
                type="button"
                className={ `flexCenter delete-action_btn ${ isDeleting ? 'bg-gray' : 'bg-primary-purple' }` }
                onClick={ handleDeleteProject }
                disabled={ isDeleting }
            >
                <Image 
                    src='/trash.svg'
                    width={ 20 }
                    height={ 20 }
                    alt=''
                    draggable='false'
                />
            </button>
        </>
    );
};

export default ProjectActions;