import React from 'react';
import { Disclosure } from '@headlessui/react';
import { Link } from 'gatsby';
// import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Header } from 'flotiq-components-react';
// import Logo from '../assets/recipe-logo.svg';

const headerText = 'POP-UP GO';

const PageHeader = () => (
    <Disclosure as="nav">
        {({ open }) => (
            <>
                <div className="max-w-7xl mx-auto py-4">
                    <div className="flex justify-between h-auto flex-wrap md:flex-nowrap">
                        <div className="flex grow ">
                            <div className="flex-shrink-0 flex ">
                                <Link to="/">
                                <Header additionalClasses={['!text-3xl font-semibold px-4']}>
                                    {headerText}
                                </Header>
                                </Link>
                            </div>
                            {/* <div className="-ml-2 mr-2 flex items-center md:hidden">
                                <Disclosure.Button
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400
                                        hover:text-gray-500 hover:bg-gray-100 focus:outline-none
                                        focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                >
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div> */}
                        </div>
                        {/* <div className="order-3 md:order-2 hidden md:flex items-center justify-center w-full">
                            <Header additionalClasses={['!text-3xl font-semibold']}>
                                {headerText}
                            </Header>
                        </div> */}
                        <div className="order-1 md:order-3 flex items-center">
                            <div className="flex-shrink-0">
                                <a
                                    href="https://forms.gle/CSbDC1DDfzbDJkiN7"
                                    target="_blank"
                                    className="relative inline-flex items-center px-4 py-2
                                    text-base md:text-lg font-regular hover:text-secondary"
                                >
                                    팝업등록
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )}
    </Disclosure>
);

export default PageHeader;
