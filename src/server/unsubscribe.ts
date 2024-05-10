async function unsubscribe() {
    const domainId = 'email-marketing-hub.com';
    const address = 'xiongtianle200@gmail.com'
    const resp = await fetch(
        `https://api.mailgun.net/v3/${domainId}/unsubscribes`,
        {
            method: 'GET',
            headers: {
                Authorization: 'Basic ' + btoa('api:88afb8030841f9b9da098e9eac52a164-ed54d65c-307e17c7')
            }
        }
    );

    const data = await resp.json();
    return data
}

export default unsubscribe()