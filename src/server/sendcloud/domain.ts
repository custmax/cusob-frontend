import clientFetch from '@/helper/clientFetch';
import {API_USER, API_KEY} from "@/constant/sendCloud";

export const getDomainList = async () => {
    const res = await clientFetch({
        url: `/api2/domain/list`,
        method: 'GET',
        data: {
            apiUser: API_USER,
            apiKey: API_KEY
        }
    })
    return res;
}

export const addDomain = async (name: string) => {
    const res = await clientFetch({
        url: `/api2/domain/add`,
        method: 'GET',
        data: {
            apiUser: API_USER,
            apiKey: API_KEY,
            name: name
        }
    })
    return res;
}

