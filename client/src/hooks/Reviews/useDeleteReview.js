import useDeleteBody from "../useDeleteBody";

export default function useDeleteReview(ReviewId) {
  return useDeleteBody(`/api/Review/delete/${ReviewId}`)[0];
}
