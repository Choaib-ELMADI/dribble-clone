'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { SessionInterface } from "@/common.types";
import FormField from './FormField';
import { categoryFilters } from '@/constants';
import CustomMenu from './CustomMenu';
import Button from './Button';
import { createNewProject, fetchToken } from '@/lib/actions';

type Props = { 
    type: string, 
    session: SessionInterface 
};



const ProjectForm = ({ type, session }: Props) => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
        description: '',
        liveSiteUrl: '',
        githubUrl: '',
        category: '',
        image: '',
        title: '',
    });

    const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const file = e.target.files?.[0];

        if (!file) return;
        if (!file.type.includes('image')) {
            return alert('Please upload an image file');
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            const result = reader.result as string;
            handleStateChange('image', result);
        }
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsSubmitting(true);

        const { token } = await fetchToken();

        try {
            if (type === 'create') {
                await createNewProject(form, session?.user?.id, token);
                router.push('/');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleStateChange = (fieldName: string, value: string) => {
        setForm((prev) => ({ ...prev, [fieldName]: value }));
    };

    return (
        <form
            onSubmit={ handleFormSubmit }
            className="flexStart form"
        >
            <div className="flexStart form_image-container">
                <label htmlFor="poster" className="flexCenter form_image-label">
                    { !form.image && 'Choose a poster for your project' }
                </label>
                <input 
                    type="file" 
                    id="image" 
                    accept="image/*" 
                    required={ type === 'create' }
                    className='form_image-input'
                    onChange={ handleChangeImage }
                />
                { form.image && (
                    <Image 
                        src={ form?.image }
                        alt=''
                        className='sm:p-10 object-contain z-20'
                        fill
                        draggable='false'
                    />
                )}
            </div>

            <FormField 
                title='Title'
                state={ form.title }
                placeholder='Flexibble'
                setState={ (value) => handleStateChange('title', value) }
            />
            <FormField 
                title='Description'
                state={ form.description }
                placeholder='Showcase and discover'
                setState={ (value) => handleStateChange('description', value) }
            />
            <FormField 
                type='url'
                title='Website URL'
                state={ form.liveSiteUrl }
                placeholder='https://example.com'
                setState={ (value) => handleStateChange('liveSiteUrl', value) }
            />
            <FormField 
                type='url'
                title='Github URL'
                state={ form.githubUrl }
                placeholder='https://github.com/Choaib-ELMADI'
                setState={ (value) => handleStateChange('githubUrl', value) }
                />

            <CustomMenu 
                title='Category'
                state={ form.category }
                filters={ categoryFilters }
                setState={ (value) => handleStateChange('category', value) }                
            />

            <div className='w-full flexStart'>
                <Button
                    title={ 
                        isSubmitting 
                            ? `${ type === 'create' ? 'Creating' : 'Editing' }` 
                            : `${ type === 'create' ? 'Create' : 'Edit' }`
                    }
                    type='submit'
                    leftIcon={ isSubmitting ? '' : '/plus.svg' }
                    isSubmitting={ isSubmitting }
                />
            </div>
        </form>
    );
};

export default ProjectForm;