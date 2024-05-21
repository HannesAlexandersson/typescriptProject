


type TitleChildren = {
    children: React.ReactNode;
}
function Title({ children }: TitleChildren){

    return(
        <h1 className="Title">{children}</h1>
    );
}

export default Title