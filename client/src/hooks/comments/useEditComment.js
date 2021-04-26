import usePutBody from '../usePutBody';

export default function useEditComment() {
    return usePutBody('/comments/update')[0]
}