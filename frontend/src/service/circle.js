import 'whatwg-fetch';

const ENDPOINT = __BASE__ + '/circle/';

export async function executeLoadCircleRequest(height, width) {
    const result = await fetch(ENDPOINT + '?height=' + height + '&width=' + width);
    return await result.json();
}

export async function executeCheckPointRequest(circle, point) {

    const payload = {
        circle,
        point
    };

    const result = await fetch(
        ENDPOINT,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
    );
    return await result.json();
}
