export const SenderStatistics = async (senderAddress: string) => {
    const acceptedQuery = new URLSearchParams({
        tag: `campaign:sender:${senderAddress}`,
        event: 'accepted',

    }).toString();

    const openedQuery = new URLSearchParams({
        tag: `campaign:sender:${senderAddress}`,
        event: 'opened',

    }).toString();

    const clickedQuery = new URLSearchParams({
        tag: `campaign:sender:${senderAddress}`,
        event: 'clicked',

    }).toString();

    const domain = 'email-marketing-hub.com';
    const acceptResp = await fetch(
        `https://api.mailgun.net/v3/${domain}/tag/stats?${acceptedQuery}`,
        {
            method: 'GET',
            headers: {
                Authorization: 'Basic ' + Buffer.from('api:88afb8030841f9b9da098e9eac52a164-ed54d65c-307e17c7').toString('base64')
            }
        }
    );

    const openResp = await fetch(
        `https://api.mailgun.net/v3/${domain}/tag/stats?${openedQuery}`,
        {
            method: 'GET',
            headers: {
                Authorization: 'Basic ' + Buffer.from('api:88afb8030841f9b9da098e9eac52a164-ed54d65c-307e17c7').toString('base64')
            }
        }
    );

    const clickedResp = await fetch(
        `https://api.mailgun.net/v3/${domain}/tag/stats?${clickedQuery}`,
        {
            method: 'GET',
            headers: {
                Authorization: 'Basic ' + Buffer.from('api:88afb8030841f9b9da098e9eac52a164-ed54d65c-307e17c7').toString('base64')
            }
        }
    );

    const accept = await acceptResp.json();
    const open = await openResp.json();
    const click = await clickedResp.json();
    const opened_rate = open.stats[7].opened.unique===0 ? 0 : open.stats[7].opened.unique/accept.stats[7].accepted.total;
    const clicked_rate = click.stats[7].clicked.total===0 ? 0 : click.stats[7].clicked.total/accept.stats[7].accepted.total;
    console.log("opened rate:",opened_rate);
    console.log("clicked rate:",clicked_rate);

}

export default SenderStatistics;