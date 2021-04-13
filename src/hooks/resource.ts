export function setRemoteResource (
    getPath: string,
    otherPaths: {
        postPath?: string, 
        deletePath?: string, 
        patchPath?: string, 
        getOnePath?: string 
    } = {},
    authenticationData?: string 
) { 
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
    const post = async function (): Promise<any> {
        const response = await fetch(otherPaths.postPath ? otherPaths.postPath : getPath, 
            fetchOptions("POST")
        )
        return await response.json();
    }

    const delOne = !otherPaths.deletePath ? null :
        async function (id: string) {
            const response = await fetch(`${otherPaths.deletePath}/${id}`,
                fetchOptions("DELETE")
            )
            return await response.json();
        }
    const patchOne = !otherPaths.patchPath ? null :
        async function (id: string) {
            const response = await fetch(`${otherPaths.patchPath}/${id}`, fetchOptions("PATCH"))
            return await response.json();
        }
    const getOne = !otherPaths.getOnePath ? null : 
        async function (id: string) {
            const response = await fetch(`${otherPaths.getOnePath}/${id}`, fetchOptions("GET"))
            return await response.json();
        }

    return [get, post, delOne, patchOne, getOne];
}