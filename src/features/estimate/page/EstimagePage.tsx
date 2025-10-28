import { EstimateFlow } from '../components/EstimateFlow';

export const EstimagePage = ({ storeToken }: { storeToken?: string }) => {
    return (
        <EstimateFlow storeToken={storeToken} />
    )
};
