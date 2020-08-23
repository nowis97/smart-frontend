/*
to deploy SMART use pm2 and this config, alsp install serve globally
*/
module.exports = {
    apps : [{
        name:"smart-web",
        script: 'npx',
        interpreter: "none",
        args: "sudo serve build -l 80"
    }]
};