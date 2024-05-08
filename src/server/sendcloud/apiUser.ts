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