export const SenderStatistics = async (senderAddress: string) => {
    const query = new URLSearchParams({
        tag: `campaign:sender:${senderAddress}`,
        event: 'delivered',

    }).toString();

    const domain = 'chtrak.com';
    const resp = await fetch(
        `https://api.mailgun.net/v3/${domain}/tag/stats?${query}`,
        {
            method: 'GET',
            headers: {
                Authorization: 'Basic ' + Buffer.from('api:88afb8030841f9b9da098e9eac52a164-ed54d65c-307e17c7').toString('base64')
            }
        }
    );

    const data = await resp.text();
    console.log(data);

}

export default SenderStatistics;