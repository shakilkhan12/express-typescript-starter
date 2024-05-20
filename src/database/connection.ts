
import { CONFIG } from '@/config';
import { connect, set } from 'mongoose';
const {NODE_ENV, DB} = CONFIG;
export const dbConnection = async () => {
 try {
    if (NODE_ENV !== 'production') {
        set('debug', true);
      }
      await connect(DB as string);
      console.log('Database connection established')
 } catch (error: any) {
    console.log('Connection failed: ' + error.message);
 }
}