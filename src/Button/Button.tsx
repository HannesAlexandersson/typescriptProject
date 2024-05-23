import { MouseEventHandler } from "react";



type Props = {
    className: string;
    children: React.ReactNode;   
    onClick?: MouseEventHandler<HTMLButtonElement>;
   
}
function Button({ onClick, className, children,}: Props){   
    

    return(
        <button className={className} onClick={onClick} >{children}</button>
    );
 }

 export default Button