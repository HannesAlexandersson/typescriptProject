
type TitleChildren = {
    children: React.ReactNode;
    className: string;
}
function Title({ children, className }: TitleChildren){

    return(
        <h1 className={`${className} `}>{children}</h1>
    );
}

export default Title