// // below is commonJS way (for import export, change way in package.json)
// const express = require('express');
// const colors = require('colors');

// // below is module way (for import export (its newer way es6(ecmaSCRIPT 2015- i.e._es-v.6)))
import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';

// configure env (as our env file is in root, so no location defining inside config method(i.e. not defining any object in config() as .env is already in root path))
dotenv.config()

// rest object
const app = express();

// rest api
app.get('/', (req,res)=>{
    res.send( '<h1>welcome to ecommerce app</h1>');
})

// port
// nodeJS uses process.env
const PORT = process.env.PORT || 8080;

// run listen 
app.listen(PORT,()=>{
    console.log(`server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
})