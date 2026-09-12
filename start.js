module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        venv: "{{platform === 'win32' ? null : 'env'}}",                // Edit this to customize the venv folder path
        conda: "{{platform === 'win32' ? 'conda_env' : null}}",
        env: { },                   // Edit this to customize environment variables (see documentation)
        path: "app",                // Edit this to customize the path to start the shell from
        message: [
          "auk-gradio {{args && args.mode === 'base' ? '--base_ckpt ckpts/AuK/auk_base.safetensors' : args && args.mode === 'flash' ? '--flash_ckpt ckpts/AuK-Flash/auk_flash.safetensors' : ''}} --host 127.0.0.1 --port {{port}}",    // Edit with your custom commands
        ],
        on: [{
          // The regular expression pattern to monitor.
          // When this pattern occurs in the shell terminal, the shell will return,
          // and the script will go onto the next step.
          "event": "/(http:\\/\\/[0-9.:]+)/",

          // "done": true will move to the next step while keeping the shell alive.
          // "kill": true will move to the next step after killing the shell.
          "done": true
        }]
      }
    },
    {
      // This step sets the local variable 'url'.
      // This local variable will be used in pinokio.js to display the "Open WebUI" tab when the value is set.
      method: "local.set",
      params: {
        // the input.event is the regular expression match object from the previous step
        url: "{{input.event[1]}}"
      }
    }
  ]
}
