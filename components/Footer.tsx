import Image from "next/image";
import Link from "next/link";

import { footerLinks } from "@/constants";

type ColumnProps = {
    title: string,
    links: Array<string>,
};

const FooterColumn = ({ title, links }: ColumnProps) => (
    <div className="footer_column">
        <h4 className="font-semibold">{ title }</h4>
        <ul className="flex flex-col gap-2 font-normal">
            {
                links.map((sublink) => (
                    <Link 
                        key={ sublink }
                        href={ `/${ sublink.toLowerCase().replaceAll(' ', '-') }` }
                    >
                        { sublink }
                    </Link>
                ))
            }
        </ul>
    </div>
);



const Fooetr = () => {
    return (
        <footer className='flexStart footer'>
            <div className="flex flex-col gap-12 w-full">
                <div className="flex items-start flex-col">
                    <Image
                        src='/logo-purple.svg'
                        alt=''
                        width={ 110 }
                        height={ 30 }
                        draggable='false'
                    />
                    <p className="text-start text-sm font-normal mt-5 max-w-xs">
                        Flexibble is the world's leading community for creatives 
                        to share, grow, and get hired.
                    </p>
                </div>
                <div className="flex flex-wrap gap-12">
                    <FooterColumn 
                        key={ footerLinks[0].title } 
                        title={ footerLinks[0].title }
                        links={ footerLinks[0].links }
                    />
                    <div className="flex flex-col flex-1 gap-4">
                        <FooterColumn 
                            key={ footerLinks[1].title } 
                            title={ footerLinks[1].title }
                            links={ footerLinks[1].links }
                        />
                        <FooterColumn 
                            key={ footerLinks[2].title } 
                            title={ footerLinks[2].title }
                            links={ footerLinks[2].links }
                        />
                    </div>
                    <FooterColumn 
                        key={ footerLinks[3].title } 
                        title={ footerLinks[3].title }
                        links={ footerLinks[3].links }
                    />
                    <div className="flex flex-col flex-1 gap-4">
                        <FooterColumn 
                            key={ footerLinks[4].title } 
                            title={ footerLinks[4].title }
                            links={ footerLinks[4].links }
                        />
                        <FooterColumn 
                            key={ footerLinks[5].title } 
                            title={ footerLinks[5].title }
                            links={ footerLinks[5].links }
                        />
                    </div>
                    <FooterColumn 
                        key={ footerLinks[6].title } 
                        title={ footerLinks[6].title }
                        links={ footerLinks[6].links }
                    />
                </div>
            </div>
            <div className="flexBetween footer_copyright">
                <p>@ 2023 Flexibble. All rights reserved</p>
                <p className="text-gray">
                    <span className="text-black font-semibold">10,154 </span>
                    project submitted
                </p>
            </div>
        </footer>
    );
};

export default Fooetr;