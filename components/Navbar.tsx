import Link from 'next/link';
import Image from 'next/image';

import { getCurrentUser } from '@/lib/session';
import AuthProviders from './AuthProviders';
import ProfileMenu from './ProfileMenu';
import { NavLinks } from '@/constants';



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
                        <ProfileMenu session={ session } />
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