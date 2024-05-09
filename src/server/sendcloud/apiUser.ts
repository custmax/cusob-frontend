import clientFetch from '@/helper/clientFetch';
import {API_USER, API_KEY} from "@/constant/sendCloud";

export const getApiUserList = async (domainName?: string) => {
    const res = await clientFetch({
        url: `/api2/apiuser/list`,
        method: 'GET',
        data: {
            apiUser: API_USER,
            apiKey: API_KEY,
            domainName: domainName
        }
    })
    return res;
}

export const addApiUser = async (name: string,  domainName: string) => {
    const res = await clientFetch({
        url: `/api2/apiuser/add`,
        method: 'GET',
        data: {
            apiUser: API_USER,
            apiKey: API_KEY,
            name: name,
            emailType: 1,
            domainName: domainName
        }
    })
    return res;
}

export const updateApiUser = async (name: string) => {
    const res = await clientFetch({
        url: `/api2/apiuser/update`,
        method: 'POST',
        data: {
            apiUser: API_USER,
            apiKey: API_KEY,
            name: name,
        }
    })
    return res;
}