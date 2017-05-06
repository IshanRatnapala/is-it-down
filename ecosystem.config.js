module.exports = {
    apps: [{
        name: 'is-it-down',
        script: './server.js'
    }],
    deploy: {
        production: {
            user: 'ubuntu',
            host: '52.221.155.144',
            key: '~/.ssh/GiffMeAkces.pem',
            ref: 'origin/master',
            repo: 'git@github.com:IshanRatnapala/is-it-down.git',
            path: '/home/is-it-down-server/',
            'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
        }
    }
};