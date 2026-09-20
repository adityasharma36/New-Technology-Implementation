

import * as z from 'zod'



export const userSchema = z.object({
    name:z.string(),
    email:z.email('inValid Email'),
    password:z.string(),
    
})