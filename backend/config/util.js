export const generateId =(prefix)=>{
    return `${prefix}${Math.random().toString(36).substring(2, 5)}`;
}