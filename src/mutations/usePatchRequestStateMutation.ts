import { requestApi } from "../apis/request/requestAPIService";
import { UpdateRequestStateParams } from "../apis/request/requestAPIService.types";
import { useMutation } from "../libs/core/react-query";

const USE_PATCH_REQUEST_STATE_MUTATION_KEY ='@request/patch/state';


interface UpdateRequestStateWithReasonStatementId {
	reasonStatementId: number;
	params: UpdateRequestStateParams;
}

export const usePatchRequestStateMutation = () => {
    const { mutateAsync } = useMutation((params: UpdateRequestStateWithReasonStatementId) => requestApi.updateRequestState(params.reasonStatementId, params.params), {
        mutationKey: [USE_PATCH_REQUEST_STATE_MUTATION_KEY]
    })

    return {
        mutateAsync
    }
}