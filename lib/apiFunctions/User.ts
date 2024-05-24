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

