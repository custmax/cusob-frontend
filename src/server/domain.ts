import clientFetch from '@/helper/clientFetch';

export const domainVerify = async (email: string) => {
    const res = await clientFetch({
        url: `/api/domain/verify`,
        method: 'POST',
        data: {email}
    })
    return res;
}