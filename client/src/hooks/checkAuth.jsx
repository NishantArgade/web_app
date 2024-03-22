import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "../api/authApi";

export const useCheckAuth = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["checkAuth"],
    queryFn: checkAuth,
    retry: false,
    refetchOnWindowFocus: false,
  });

  let isLoggedIn = data?.isLoggedIn;
  if (isError) isLoggedIn = false;

  return { isLoggedIn, isLoading, user: data?.user };
};
