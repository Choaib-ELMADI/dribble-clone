'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

type Props = {
    id: string,
    image: string,
    title: string,
    name: string,
    avatarUrl: string,
    userId: string
};



const ProjectCard = ({ id, image, title, name, avatarUrl, userId }: Props) => {
    const [randomLikes, setRandomLikes] = useState(100);
    const [randomViews, setRandomViews] = useState('1k');

    useEffect(() => {
        setRandomLikes(Math.floor(Math.random() * 10_000));
        setRandomViews(String(Math.floor((Math.random() * 10000) / 1000).toFixed(1) + 'k'))
    }, []);    

    return (
        <div className='flexCenter flex-col rounded-2xl drop-shadow-card'>
            <Link 
                href={ `/project/${ id }` }
                className="flex flex-col group relative w-full h-full"
            >
                <Image 
                    src={ image }
                    alt=''
                    width={ 414 }
                    height={ 314 }
                    draggable='false'
                    className="w-full h-full object-cover rounded-2xl"
                />
                <div className="hidden group-hover:flex profile_card-title">
                    <p className="w-full">{ title }</p>
                </div>
            </Link>
            <div className="flexBetween w-full gap-2 mt-2 font-semibold text-sm">
                <Link 
                    href={ `/profile/${ userId }` }
                >
                    <div className="flexCenter gap-2">
                        <Image 
                            src={ avatarUrl }
                            width={ 30 }
                            height={ 30 }
                            alt=""
                            draggable='false'
                            className="rounded-full"
                        />
                        <p>{ name }</p>
                    </div>
                </Link>

                <div className="flexCenter gap-3">
                    <div className="flexCenter gap-1">
                        <Image 
                            src='/hearth.svg'
                            width={ 14 }
                            height={ 14 }
                            alt=''
                            draggable='false'
                        />
                        <p className="text-sm">{ randomLikes }</p>
                    </div>
                    <div className="flexCenter gap-1">
                        <Image 
                            src='/eye.svg'
                            width={ 14 }
                            height={ 14 }
                            alt=''
                            draggable='false'
                        />
                        <p className="text-sm">{ randomViews }</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;