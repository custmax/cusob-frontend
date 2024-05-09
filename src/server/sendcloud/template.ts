import clientFetch from '@/helper/clientFetch';
import {API_USER, API_KEY} from "@/constant/sendCloud";

export const getTemplateList = async () => {
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