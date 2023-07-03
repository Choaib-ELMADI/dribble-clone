import Link from 'next/link';
import Image from 'next/image';

import { NavLinks } from '@/constants';
import AuthProviders from './AuthProviders';
import { getCurrentUser } from '@/lib/session';



const Navbar = async () => {
    const session = await getCurrentUser();

    return (
        <nav className='flexBetween navbar'>
            <div className='flex-1 flexStart gap-10'>
                <Link href='/'>
                    <Image 
                        src='/logo.svg'
                        alt=''
                        width={ 110 }
                        height={ 30 }
                        draggable='false'
                    />
                </Link>
                <ul className='xl:flex hidden text-small gap-7'>
                    {
                        NavLinks.map((navLink) => (
                            <li key={ navLink.key }>
                                <Link href={ navLink.href }>{ navLink.text }</Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className='flexCenter gap-4'>
                { session?.user ? (
                    <>
                        { session?.user?.image && (
                            <Image 
                                src={ session.user.image }
                                alt={ session.user.name }
                                width={ 40 }
                                height={ 40 }
                                className='rounded-full'
                            />
                        )}
                        <Link href='/create-project'>Share work</Link>
                    </>
                ) : (
                    <AuthProviders />
                )}
            </div>
        </nav>
    );
};

export default Navbar;