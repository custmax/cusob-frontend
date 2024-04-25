import clientFetch from '@/helper/clientFetch';

export const domainVerify = async (domain: string) => {
    const res = await clientFetch({
        url: `/api/domain/verify`,
        method: 'POST',
        data: {domain},
        contentType: 'application/x-www-form-urlencoded',
    })
    return res;
}

export const getDomainList = async () =>{
    const res = await clientFetch({
        url: `/api/domain/getList`,
        method: 'GET',
    })
    return res;
}