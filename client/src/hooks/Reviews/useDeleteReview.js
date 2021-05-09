import useDeleteBody from '../useDeleteBody';

export default function useDeleteReview(ReviewId) {
    return useDeleteBody(`/Reviews/delete/${ReviewId}`)[0];
}