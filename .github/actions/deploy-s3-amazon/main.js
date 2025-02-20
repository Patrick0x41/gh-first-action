const core = require('@actions/core')
const github  = require('@actions/github')
const exec = require('@actions/exec')



function run() 

{
    //  1) get some input values
    const bucket = core.getInput('bucket',{required:true}) ; 
    const bucketRegion = core.getInput('us-east-1',{required:false});
    const distFolder = core.getInput('dist-folder',{required:true});

    // 2) Upload Files
    const s3Uri = `s3://${bucket}`

    exec(`aws s3 sync "${distFolder}" "${s3Uri}" --region "${bucketRegion}"`, (error, stdout, stderr) => {
    if (error) {
        core.notice(`Error: ${error.message}`);
        return;
    }
    if (stderr) {
        core.notice(`stderr: ${stderr}`);
        return;
    }
    core.notice(`stdout: ${stdout}`);
});
    
    core.notice('Hello from my custom javascript action!');
}

run();