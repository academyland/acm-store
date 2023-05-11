export const useLoginDialog = () => {
    const loginModel = useState('login-dialog', () => false);
    const loginCallback = useState<Function>('login-callback');
    const open = (callback = () => { }) => {
        loginCallback.value = callback;
        loginModel.value = true;
    }
    return {
        loginModel: computed({
            get() {
                return unref(loginModel)
            },
            set(value) {
                if (!value) {
                    loginCallback.value = () => { }
                }
                loginModel.value = value
            }
        }), loginCallback, open
    }
}