import usePostBody from '../usePostBody';

export default function useAddComment() {
   return usePostBody('/comments/add')[0]
}