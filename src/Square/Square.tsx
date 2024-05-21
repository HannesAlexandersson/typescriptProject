
type Props = {
    value: React.ReactNode;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function Square({value, onClick}: Props){
    return (
    <button onClick={onClick} className="square">
        {value}
    </button>
    );
}


export default Square