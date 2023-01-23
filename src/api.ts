const url = "http://1001309-cw53044.tmweb.ru";

export const loadAdressessByQuery = (query: string) => {
    return fetch(`${url}/address?address=${query}`)
    .then((response: any) => response.text())
    .then((result: any) => {
      return JSON.parse(result)
    })
    .catch((error: any) => console.log("error", error))
}

export const loadContacts = (query: string) => {
    return fetch(`${url}/users?lastName=${query}`)
    .then((response: any) => response.text())
    .then((result: any) => {
      return JSON.parse(result)
    })
    .catch((error: any) => console.log("error", error))
}