import { Home } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';
import { useState, useEffect, useRef } from 'react';
import HomePage from './HomePage';

function AuthPage() {
    // Inside AuthPage.jsx
    const { login, register, formData, setFormData, loading, currentUser } = useUserStore();
    const [isLogin, setIsLogin] = useState(false);
    const dialogRef = useRef(null);
    
    useEffect(() => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
        }
    }, []);

    useEffect(() => {
        if (isLogin)
            console.log("Login");
        else
            console.log("Register");
    })

    // useEffect(() => {
    //     if(login)
    //     {
    //         console.log("SUCCESS");
    //         <HomePage/>   //XXXXXXXXXXXXXX WRONG
    //     }
    // }, []) 

    if (currentUser){
        return <HomePage/>;
    }

    return(
        <dialog id="log_user" ref={dialogRef} className='modal'>
            <div className='modal-box'>

                <div className='modal-action'>
                    <button 
                        type="button"
                        className='btn btn-ghost'
                        onClick={() => setIsLogin(false)}
                    >
                        Register
                    </button>

                    <button 
                        type="button"
                        className='btn btn-ghost'
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>
                </div>



                <h3 className='font-bold text-xl mb-8'>{isLogin?"Login":"Register"}</h3>
                <form onSubmit={isLogin?login:register} className='space-y-6'>
                    <div className='grid gap-6'>
                        
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text text-base font-medium'>UserName</span>
                            </label>
                            <div className='relative w-full input input-bordered focus:input-primary duration-200 flex mb-6 items-center px-3 h-10'>
                                <input 
                                    type="text"
                                    placeholder="Enter Username"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>
      

                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text text-base font-medium'>Password</span>
                            </label>
                            <div className='relative w-full input input-bordered focus:input-primary duration-200 flex mb-6 items-center px-3 h-10'>
                                <input 
                                    type="password"
                                    placeholder="Enter Password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                    </div>

                    <div className='modal-action'>
                        <button
                            type="submit"
                            className="btn btn-primary min-w-[120px]"
                            disabled={!formData.name || !formData.password || loading}
                        >
                            {loading ? (<span className="loading loading-spinner loading-sm" />) : 
                            (<> {isLogin?"Login":"Register"} </>)}
                        </button>
                        
                    </div>
                </form>
                
            </div>

            {/* <form method="dialog" className="modal-backdrop">
                <button>xxxxx</button>
            </form> */}
        </dialog>
    );
}
export default AuthPage;