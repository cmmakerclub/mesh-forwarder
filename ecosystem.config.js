module.exports = {
  apps: [{
    name: 'mesh-01',
    cwd: '/Users/nat/projects/mesh-forwarder',
    script: './dist/app.js',
    // merge_logs: true,
    // log_date_format: 'YYYY-MM-DD HH:mm Z',
    env: {
      LOG_LEVEL: 'info',
    },
    env_verbose: {
      LOG_LEVEL: 'verbose',
    },
    env_debug: {
      LOG_LEVEL: 'debug',
    },
  }],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: 'node',
      host: '212.83.163.1',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/production',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
    },
    dev: {
      user: 'node',
      host: '212.83.163.1',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/development',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env dev',
      env: {
        NODE_ENV: 'dev'
      }
    }
  }
}
