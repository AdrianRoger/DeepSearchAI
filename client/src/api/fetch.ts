

interface IFetchResponse {
    token?: string,
    data?: any,
    error?: string
}

const baseUrl = 'http://localhost:3000/api';

export interface ITheme {
    id: string,
    name: string
}

export const fetchThemes = async ():Promise<IFetchResponse> => {
    try {
        const response = await fetch(baseUrl + '/themes');
        
        if (!response.ok) {
            const errorResponse = await response.json();
            return { error: errorResponse.error }
        } 

        const data = await response.json();
        
        return { ...data };
    } catch (error: any) {
        return { error: error.message }
    }
}

export const saveUserThemes = async (userID: string, usersThemes:Array<string>):Promise<IFetchResponse> => {
    try {
        const response = await fetch(baseUrl + `/user/${userID}/themes`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ 
                usersThemes
            }),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            return { error: errorResponse.error }
        } 

        const data = await response.json();
        
        return { ...data };
    } catch (error: any) {
        return { error: error.message }
    }
}

export const login = async (email: string, password: string): Promise<IFetchResponse> => {
    try {
        const response = await fetch(`${baseUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ 
                email,
                password
            }),
        });
        
        if (!response.ok) {
            const errorResponse = await response.json();
            return { error: errorResponse.error }
        } 

        const data = await response.json();
        
        return { ...data };
    } catch (error: any) {
        return { error: error.message }
    }
}

export const registerUser = async (email: string, password: string): Promise<IFetchResponse> => {
    try {
        const response = await fetch(`${baseUrl}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ 
                email,
                password
            }),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            return { error: errorResponse.error }
        } 

        const data = await response.json();
        
        return { ...data };
    } catch (error: any) {
        return { error: error.message }
    }
}

export const getPromptSuggestions = async (userID: string) => {
    try {
        const response = await fetch(baseUrl + `/user/${userID}/suggestions`);

        if (!response.ok) {
            const errorResponse = await response.json();
            return { error: errorResponse.error }
        } 

        const data = await response.json();
        
        return { ...data };
    } catch (error: any) {
        return { error: error.message }
    }
}