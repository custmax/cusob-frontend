import clientFetch from '@/helper/clientFetch';
import {API_KEY, API_USER} from "@/constant/sendCloud";


export const getAddressList = async () => {
    const res = await clientFetch({
        url: `/api2/addresslist/list`,
        method: 'GET',
        data: {
            apiUser: API_USER,
            apiKey: API_KEY
        }
    })
    return res;
}