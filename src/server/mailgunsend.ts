export const send = async (from:string,to:string[],subject:string,html:string,deliveryTime:string,ids:number[]) => {
    const form = new FormData();
    form.append('from', from);
    form.append('to', to.join(','));
    form.append('subject', subject);
    form.append('html', html+'<p>If you wish to unsubscribe, click <https://mailgun.com/unsubscribe/%recipient.id%></p>');

    form.append('o:deliverytime', new Date(deliveryTime).toUTCString());

    const senderTag = `campaign:sender:${from}`;
    form.append('o:tag', senderTag);
    const recipientVariables: { [key: string]: {  id: number } } = {};
    ids.forEach((id,index)=>{
        recipientVariables[to[index]] = {  id: ids[index] };
    })

    form.append('recipient-variables',JSON.stringify(recipientVariables));

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
