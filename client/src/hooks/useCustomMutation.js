import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useCustomMutation = (options) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: options.mutationFn,
        onSuccess: (data, newData, context) => {
            console.log("in success")
            options.successFn && options.successFn(data, newData)
            options.invalidateKeys && options.invalidateKeys.map((key, index) => queryClient.invalidateQueries(key))
        },
        onError: (data, newData, context) => {
            console.log("Error happend")
            options.errorFn && options.errorFn()

        }
    })
}
