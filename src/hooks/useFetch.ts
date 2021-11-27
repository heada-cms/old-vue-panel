/* eslint-disable */
import router from "@/router";
import store from "@/store";

interface fetchFunctions {
    getMany: () => Promise<any>;
    getOne: (id: string) => Promise<any>;
    create: (body: unknown) => Promise<any>;
    del: (id: string) => Promise<any>;
    update: (id: string, body: unknown) => Promise<any>;
}


function handleResponse(response:Response) {
    if (!response.ok) {
        return response;
    }
    return response.json();
}

export default function useFetch(url: string, authMethod:Record<string, string> = {}): fetchFunctions {
    
    const getMany = () => 
        fetch(url, {
            headers: {
                "Content-Type": "application/json",
                ...authMethod
            }
        })
        .then(handleResponse)
        
    
    const getOne = (id: string) => 
        fetch(`${url}/${id}`, { 
            headers: { 
                "Content-Type": "application/json", 
                ...authMethod 
            } 
        })
        .then(handleResponse)
        
    const create = (body: unknown) => 
        fetch(url, {
            headers: { 
                "Content-Type": "application/json", 
                ...authMethod 
            },
            method: "POST",
            body: JSON.stringify(body)
        })
        .then(handleResponse)
    const update = (id: string, body: unknown) => 
        fetch(`${url}/${id}`, {
            headers: { 
                "Content-Type": "application/json", 
                ...authMethod 
            },
            method: "PATCH",
            body: JSON.stringify(body) 
        })
        .then(handleResponse)

    const del = (id: string) => 
        fetch(`${url}/${id}`, { 
            headers: { 
                "Content-Type": "application/json", 
                ...authMethod 
            },
            method: "DELETE"
        })
        .then(handleResponse)


    return {getMany, getOne, create, update, del}
}