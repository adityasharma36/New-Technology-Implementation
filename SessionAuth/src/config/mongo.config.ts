
import mongoose from 'mongoose'
import {  serverConfig } from './server.config.js';

export async function connectToDb(){

    await mongoose.connect(serverConfig.MONGO_URL);

    console.log('connect to db')
    
}