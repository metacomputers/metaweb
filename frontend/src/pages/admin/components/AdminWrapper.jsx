import React from 'react';
import MenuItem from "./MenuItem.jsx";

const AdminWrapper = ({children}) => {
    const year = new Date().getFullYear()
    const menu = [
        {
            label: 'Dashboard',
            link: '/admin',
        },
        {
            label: 'Repair',
            link: '/admin/repair',
        },
        {
            label: 'Consult',
            link: '/admin/Consult',
        }
    ]
    return (
        <main className={"flex relative flex-col gap-5 justify-between px-10 py-5 w-full min-h-screen"}>
            <header className="w-full flex justify-between">
                <a href={"/admin"} className="font-bold md:text-2xl text-xl lg:text-3xl">
                    Meta
                </a>
                <nav className="w-full flex-row flex gap-10 justify-end items-end">
                    {menu.map((item, i) => (
                        <MenuItem key={i} link={item.link} label={item.label} />
                    ))}
                </nav>
            </header>
            {children}
            <footer className="w-full capitalize tracking-wide absolute bottom-0 left-0 py-4 text-lg bg-black flex gap-10 justify-center items-center font-bold text-white">
                <p>©{year} Meta All Right Reserved.</p>
            </footer>
        </main>
    );
};

export default AdminWrapper;