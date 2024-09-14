import { useMutation } from "@tanstack/react-query"

export const UseMutationHooks = (fnCallback) => {
    const mutation = useMutation({
        mutationFn: fnCallback
    })
    return mutation
}