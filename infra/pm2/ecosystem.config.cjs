module.exports = {
  apps: [
    {
      name: 'abang-api',
      cwd: './apps/api',
      script: 'npm',
      args: 'run start'
    },
    {
      name: 'abang-web',
      cwd: './apps/web',
      script: 'node',
      args: '.output/server/index.mjs'
    }
  ]
}
