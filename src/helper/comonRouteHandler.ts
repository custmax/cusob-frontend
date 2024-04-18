import { headers } from "next/headers";
import serverFetch from "./serverFetch";

const routeHandler = async (request: Request) => {
  const headersList = headers()
  const token = headersList.get('token') || ''
  const pathname = new URL(request.url).pathname.replace('/api', '') + new URL(request.url).search;
  const contentType = request.headers.get('Content-Type') || 'application/json';
  const method = request.method;
  const text = await request.text()
  const result = await serverFetch({
    url: pathname,
    method,
    data: text,
    contentType,
    token,
  })
  if (result.status === 200) {
    const res = await result.json()
    return Response.json(res);
  }
  return Response.json({ code: result.status });
};

export default routeHandler;
