import { FetchError } from "ohmyfetch";
export interface FetchCustomConfig {
    setToken?: boolean;
    ignoreErrors?: boolean;
    onError?: (e: FetchError) => void;
    onValidationFailed?: (errors: Record<string, string>, e: FetchError) => void;
    toastError?: boolean;
    setErrors?: (errors: { [key: string]: string }) => void;
    // transformer?: (data: any) => any;
    goToLogin?: boolean;
}