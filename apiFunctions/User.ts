import apiUrl from "./config";



export async function Signup(email: string, password: string): Promise<void | string> {
    const userData: object = {
        "Email": email,
        "Password": password
    }
    fetch(apiUrl + '/registration', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        .then(response => {
            if (response.ok) {           
                return response.json(); 
            } else {
                throw new Error('Failed to send data'); 
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

export async function login( email: string, password: string): Promise<void | string> {    
    
    const login = await fetch(apiUrl + '/login', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',        
        },
        body: JSON.stringify({ email, password }),
    });
    
    if (!login.ok) {         
        throw new Error('Failed to fetch data');
    }
    const data: string = await login.json();    
    return data;   
}

/*REFERENCE DELETE ON PRODUCTION
 <div className="row">
                <Square value={squares[0]} onClick={()=> handleClick(0)}/>
                <Square value={squares[1]} onClick={()=> handleClick(1)}/>
                <Square value={squares[2]} onClick={()=> handleClick(2)}/>
            </div>
            <div className="row">
                <Square value={squares[3]} onClick={()=> handleClick(3)}/>
                <Square value={squares[4]} onClick={()=> handleClick(4)}/>
                <Square value={squares[5]} onClick={()=> handleClick(5)}/>
            </div>
            <div className="row">
                <Square value={squares[6]} onClick={()=> handleClick(6)}/>
                <Square value={squares[7]} onClick={()=> handleClick(7)}/>
                <Square value={squares[8]} onClick={()=> handleClick(8)}/>
            </div> 

            */