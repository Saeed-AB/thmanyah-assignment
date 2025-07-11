import { api } from "@/lib/axios";
import { AxiosError } from "axios";

const handleApiError = (error: unknown) => {
  let errorMessage = "Something went wrong!";
  let status = 400;

  if (error instanceof AxiosError) {
    status = error.response?.status ?? 400;
    errorMessage = error?.response?.statusText || error?.message;
  }

  return new Response(
    JSON.stringify({
      status,
      error: errorMessage,
    })
  );
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  try {
    const res = await api({
      method: "GET",
      url: `/search?${searchParams.toString()}`,
    });

    return Response.json({
      status: 200,
      data: res.data,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
