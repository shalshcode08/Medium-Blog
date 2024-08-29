import { Quoute } from './../components/Quote';
import { Auth } from './../components/Auth';

export const Signup = () => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2'>
            <div>
                <Auth type='signup'/>
            </div>

            <div className='hidden lg:block'>
                <Quoute />
            </div>
        </div>  
    )
}