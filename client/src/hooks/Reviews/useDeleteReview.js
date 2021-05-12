import useDeleteBody from "../useDeleteBody";

export default function useDeleteReview(ReviewId) {
  return useDeleteBody(`/api/Reviews/delete/${ReviewId}`)[0];
}
