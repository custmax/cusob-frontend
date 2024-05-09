export const send = async (from:string,to:string,subject:string,html:string,deliveryTime:string) => {
    const form = new FormData();
    form.append('from', from);
    form.append('to', to);
    form.append('subject', subject);
    form.append('html', html);
    form.append('o:deliverytime', new Date(deliveryTime).toUTCString());
    const senderTag = `campaign:sender:${from}`;
    form.append('o:tag', senderTag);
    console.log(senderTag)
    const domainName = 'email-marketing-hub.com';
    const resp = await fetch(
        `https://api.mailgun.net/v3/${domainName}/messages`,
        {
            method: 'POST',
            headers: {
                Authorization: 'Basic ' + btoa('api:88afb8030841f9b9da098e9eac52a164-ed54d65c-307e17c7')
            },
            body: form
        }
    );

    const text = await resp.json(); // 存储响应体
    return text;
}
