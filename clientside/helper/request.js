var url = 'http://proj15.ruppin-tech.co.il/';

export async function GetRequest(action) {
  const request = await fetch(url + action);
  return await request.json();
}

export async function PostRequest(action, BodyObj) {
  const request = await fetch(url + action, {
    method: 'POST',
    body: JSON.stringify(BodyObj),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  return await request.json();
}

export async function PostRequest2(action, BodyObj) {
  const request = await fetch(url + action, {
    method: 'POST',
    body: BodyObj,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await request.json();
}

export async function PostRequest1(action, BodyObj) {
  const request = await fetch(url + action, {
    method: 'POST',
    body: BodyObj,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await request.json();
}
