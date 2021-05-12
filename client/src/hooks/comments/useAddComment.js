import usePostBody from "../usePostBody";

export default function useAddComment() {
  return usePostBody("/api/comments/add")[0];
}
