export function useRemoteResource (
    getPath: string,
    otherPaths: {
        postPath?: string, 
        deletePath?: string, 
        patchPath?: string, 
        getOnePath?: string 
    } = {},
    authenticationData?: string 
): Array<any>  { 
    const fetchOptions = function (method: string) {
        return { method: method, headers: {
                "Authorization": `${authenticationData}`
            }
        }
    }

    const get = async function (): Promise<any> {
        const response = await fetch(getPath,fetchOptions("GET"))
        return await response.json();
    }
    const post = async function (body: unknown): Promise<any> {
        const response = await fetch(otherPaths.postPath ? otherPaths.postPath : getPath, 
                { 
                    method: "POST",
                    headers: 
                    {
                        "Authorization": `${authenticationData}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
        )
        return await response.json();
    }

    

    return [get, post];
}