import Image from "next/image";
import { MouseEventHandler } from "react";

type Props = {
    title: string,
    type: 'button' | 'submit',
    leftIcon?: string | null,
    rightIcon?: string | null,
    handleClick?: MouseEventHandler,
    isSubmitting?: boolean,
    bgColor?: string,
    textColor?: string,
};



const Button = ({ 
    title, 
    type, 
    leftIcon, 
    rightIcon, 
    handleClick, 
    isSubmitting, 
    bgColor, 
    textColor 
}: Props) => {
    return (
        <button 
            type={ type || 'button' }
            disabled={ isSubmitting }
            className={ `flexCenter gap-3 px-4 py-3 ${ textColor ? textColor : 'text-white' } ${ isSubmitting ? 'bg-black/50' : bgColor ? bgColor : 'bg-primary-purple' } rounded-xl text-sm font-medium max-md:w-full` }
            onClick={ handleClick }
        >
            { leftIcon && (
                <Image 
                    src={ leftIcon }
                    alt=''
                    width={ 14 }
                    height={ 14 }
                    draggable='false'
                />
            )}
            { title }
            { rightIcon && (
                <Image 
                    src={ rightIcon }
                    alt=''
                    width={ 14 }
                    height={ 14 }
                    draggable='false'
                />
            )}
        </button>
    );
};

export default Button;