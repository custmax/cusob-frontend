import clientFetch from '@/helper/clientFetch';

export const sendTemplate = async (data: sendTemplate.sendModel) => {
    const res = await clientFetch({
        url: `https://email.api.engagelab.cc/v1/mail/sendtemplate`,
        method: 'POST',
        authorization: 'Basic ZGF5YnJlYWs6ZDA0NjZkYjJkYTVjN2ZjYTE2MzNmNjY1ZDI3OGRhYjQ=',
        data,
    })
    return res;
}

