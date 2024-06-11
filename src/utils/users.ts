type UserType = {
    socketId: string
}
export let users: UserType[] = []
export const addUser = (socketId: string) => {
    const checkUser = users.find((user: UserType) => user.socketId === socketId)  
    if(!checkUser) {
      users.push({socketId})
    }
}
export const getUser = (socketId: string) => {
    return users.find((user: UserType) => user.socketId === socketId);
}