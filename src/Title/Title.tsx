import React from 'react';

type TitleProps = {
    children: React.ReactNode;
    className?: string;
}
function Title({ children, className }: TitleProps): React.ReactNode{

    return(
        <h1 className={`${className} `}>{children}</h1>
    );
}

export default Title