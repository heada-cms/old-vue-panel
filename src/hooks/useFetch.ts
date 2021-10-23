interface fetchFunctions {
    getMany: () => Promise<any>;
    getOne: (id: string) => Promise<any>;
    create: (body: unknown) => Promise<any>;
    del: (id: string) => Promise<any>;
    update: (id: string, body: unknown) => Promise<any>;
}




export default function useFetch(url: string, authMethod:Record<string, string> = {}): fetchFunctions {
    
    const getMany = () => 
        fetch(url, {
            headers: {
                "Content-Type": "application/json",
                ...authMethod
            }
        })
        .then(response => response.json());
    
    const getOne = (id: string) => 
        fetch(`${url}/${id}`, { 
            headers: { 
                "Content-Type": "application/json", 
                ...authMethod 
            } 
        })
        .then(response => response.json());
    const create = (body: unknown) => 
        fetch(url, {
            headers: { 
                "Content-Type": "application/json", 
                ...authMethod 
            },
            method: "POST",
            body: JSON.stringify(body)
        })
        .then(response => response.json());
    const update = (id: string, body: unknown) => 
        fetch(`${url}/${id}`, {
            headers: { 
                "Content-Type": "application/json", 
                ...authMethod 
            },
            method: "PATCH",
            body: JSON.stringify(body) 
        })
        .then(response => response.json())

    const del = (id: string) => 
        fetch(`${url}/${id}`, { 
            headers: { 
                "Content-Type": "application/json", 
                ...authMethod 
            },
            method: "DELETE"
        })
        .then(response => response.json());


    return {getMany, getOne, create, update, del}
}