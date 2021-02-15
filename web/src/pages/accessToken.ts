export let accessToken = '';

export const setAcessToken = (s: string) => {
    accessToken = s;

};
export const getAccessToken = () => {
    return accessToken
    
};