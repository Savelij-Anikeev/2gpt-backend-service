"use strict";
const express = require('express');
const app = express();
let PORT = 5000;
app.listen(PORT, () => {
    console.log(`just started at ${PORT}`);
});
