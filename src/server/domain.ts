import clientFetch from '@/helper/clientFetch';
import {getDomain} from "@/server/sendcloud/domain";

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

export const saveDomain = async (data:Apidomain.NewApidomain) =>{
    console.log(data)
    const res = await clientFetch({
        url: `/api/apiDomain/save`,
        method: 'POST',
        data: data
    })
    return res;

}