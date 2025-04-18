import React from 'react';

const Button = ({ label, desc, link }) => {
    return (
        <a
            href={link}
            role="button"
            tabIndex="0"
            className="md:w-[20rem] w-[17rem] h-[6rem] transition-transform duration-300 bg-white p-4 rounded-lg flex flex-col justify-center items-center gap-2
                       hover:shadow-xl hover:scale-105 focus:scale-105 focus:ring-2 focus:ring-blue-500 active:scale-100"
        >
            <h3 className="text-xl font-bold text-center text-blue-500">{label}</h3>
            <p className="text-slate-500 text-center font-medium text-sm">{desc}</p>
        </a>
    );
};

export default Button;
