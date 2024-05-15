import clientFetch from '@/helper/clientFetch';
import EmailSend = Email.Send

export const sendEmail = async (data: EmailSend) => {
    const res = await clientFetch({
        url: `/api2/mail/send`,
        method: 'POST',
        data: data,
        contentType: 'application/x-www-form-urlencoded'
    })
    return res;
}