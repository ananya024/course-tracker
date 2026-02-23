import { LogOutIcon } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';

function SignOut() {
    const { logout, currentUser } = useUserStore();

    if (!currentUser) return null;

    return (
        <button 
            className="btn btn-ghost btn-circle text-error" 
            onClick={logout}
            title="Sign Out"
        >
            <LogOutIcon className="size-5" />
            SignOut
        </button>
    )
}
export default SignOut;