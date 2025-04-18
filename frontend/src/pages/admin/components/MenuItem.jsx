import React from 'react';

const MenuItem = ({link,label}) => {
    return (
        <a href={link} className="text-lg text-gray-500 hover:border-b-2 duration-75 border-b-gray-500 h-7 transition-all font-semibold">
            {label}
        </a>
    );
};

export default MenuItem;